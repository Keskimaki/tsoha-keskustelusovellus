import React, { useState, useContext } from 'react'

import { Wrapper, Text, SecondaryText, SmallButton, Image, LargeImage } from '../../assets/styles'
import { BASE_URI } from '../../config'
import { UserContext } from '../UserProvider'

const Post = ({ post }) => {
  const [image, setImage] = useState(false)
  const [user] = useContext(UserContext)

  return (
      <Wrapper>
        <strong>{post.username}</strong> <SecondaryText>{post.time}</SecondaryText>
        <Text>{post.content}</Text>
        {user && user.id === post.user_id && <Buttons post={post} />}
        {post.image &&
          (image
            ? <Image onClick={() => setImage(!image)} src={`${BASE_URI}/images/${post.id}`} />
            : <LargeImage onClick={() => setImage(!image)} src={`${BASE_URI}/images/${post.id}`} />
          )}
      </Wrapper>
  )
}

const Buttons = ({ post }) => {
  return (
    <div>
      {post.image
        ? <SmallButton>Remove image</SmallButton>
        : <SmallButton>Add image</SmallButton>}
      <SmallButton>Edit</SmallButton>
      <SmallButton>Delete</SmallButton>
    </div>
  )
}

export default Post
