import React, { useState } from 'react'

import { Wrapper, Text, SecondaryText, Image, LargeImage } from '../../assets/styles'
import { BASE_URI } from '../../config'

const Post = ({ post }) => {
  const [image, setImage] = useState(false)

  return (
      <Wrapper>
        <strong>{post.username}</strong> <SecondaryText>{post.time}</SecondaryText>
        <Text>{post.content}</Text>
        {post.image && <br/>}
        {post.image &&
          (image
            ? <Image onClick={() => setImage(!image)} src={`${BASE_URI}/images/${post.id}`} />
            : <LargeImage onClick={() => setImage(!image)} src={`${BASE_URI}/images/${post.id}`} />
          )}
      </Wrapper>
  )
}

export default Post
