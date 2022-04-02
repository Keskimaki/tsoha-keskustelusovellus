import React, { useState, useContext } from 'react'

import { SmallButton } from '../../../assets/styles'
import { editPost, deletePost } from '../../../services/posts'
import { removeImage } from '../../../services/images'
import { UserContext } from '../../UserProvider'
import AddImage from './AddImage'

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

export default PostButtons
