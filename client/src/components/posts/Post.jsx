import React, { useState, useContext } from 'react'

import { Wrapper, Text, SecondaryText, SmallButton, Image, LargeImage } from '../../assets/styles'
import { editPost, deletePost } from '../../services/posts'
import { UserContext } from '../UserProvider'
import { BASE_URI } from '../../config'

const Post = ({ post, updatePosts }) => {
  const [image, setImage] = useState(false)
  const [user] = useContext(UserContext)

  return (
      <Wrapper>
        <strong>{post.username}</strong> <SecondaryText>{post.time}</SecondaryText>
        <Text>{post.content}</Text>
        {user && user.id === post.user_id && <Buttons post={post} updatePosts={updatePosts} />}
        {post.edit !== 'None' &&
          <SecondaryText>edited {post.edit.substring(0, 19)}</SecondaryText>}
        {post.image &&
          (image
            ? <LargeImage onClick={() => setImage(!image)} src={`${BASE_URI}/images/${post.id}`} />
            : <Image onClick={() => setImage(!image)} src={`${BASE_URI}/images/${post.id}`} />
          )}
      </Wrapper>
  )
}

const Buttons = ({ post, updatePosts }) => {
  const [user] = useContext(UserContext)

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
        ? <SmallButton>Remove image</SmallButton>
        : <SmallButton>Add image</SmallButton>}
      <SmallButton onClick={handlePostEditing}>Edit</SmallButton>
      <SmallButton onClick={handlePostDeletion}>Delete</SmallButton>
    </div>
  )
}

export default Post
