import React, { useState, useContext } from 'react'

import { Wrapper, Text, SecondaryText, SmallButton, Image, LargeImage } from '../../assets/styles'
import AddImage from './AddImage'
import { editPost, deletePost } from '../../services/posts'
import { removeImage } from '../../services/images'
import { UserContext } from '../UserProvider'
import { BASE_URI } from '../../config'

const Post = ({ post, updatePosts }) => {
  const [user] = useContext(UserContext)

  return (
      <Wrapper>
        <strong>{post.username}</strong> <SecondaryText>{post.time}</SecondaryText>
        <Text>{post.content}</Text>
        {user && user.id === post.user_id &&
          <PostButtons post={post} updatePosts={updatePosts} />}
        {post.image && <PostImage postId={post.id} />}
        {post.edit !== 'None' &&
          <SecondaryText>edited {post.edit.substring(0, 19)}</SecondaryText>}
      </Wrapper>
  )
}

const PostImage = ({ postId }) => {
  const [imageFocus, setImageFocus] = useState(false)

  return (
    <div>
      {imageFocus
        ? <LargeImage
          onClick={() => setImageFocus(!imageFocus)}
          src={`${BASE_URI}/images/${postId}`} />
        : <Image
          onClick={() => setImageFocus(!imageFocus)}
          src={`${BASE_URI}/images/${postId}`} />}
    </div>
  )
}

const PostButtons = ({ post, updatePosts }) => {
  const [imageFocus, setImageFocus] = useState(false)
  const [user] = useContext(UserContext)

  const handleImageRemoval = async () => {
    if (!window.confirm('Are you sure you want to remove this image?')) {
      return
    }

    await removeImage(user.token, post.id)
    await updatePosts()
  }

  const handlePostEditing = async () => {
    const content = window.prompt('Edit your post:', post.content)

    if (!content) {
      return
    }

    await editPost(user.token, post.id, content)
    await updatePosts()
  }

  const handlePostDeletion = async () => {
    if (!window.confirm('Are you sure you want to delete this post?')) {
      return
    }

    await deletePost(user.token, post.id)
    await updatePosts()
  }

  return (
    <div>
      {post.image
        ? <SmallButton onClick={handleImageRemoval}>Remove image</SmallButton>
        : <SmallButton onClick={() => setImageFocus(!imageFocus)}>Add image</SmallButton>}
      <SmallButton onClick={handlePostEditing}>Edit</SmallButton>
      <SmallButton onClick={handlePostDeletion}>Delete</SmallButton>
      {imageFocus && <AddImage postId={post.id} updatePosts={updatePosts} setImageFocus={setImageFocus} />}
    </div>
  )
}

export default Post
