import React from 'react'

import { Wrapper } from '../../assets/styles'

const Post = ({ post }) => {
  return (
    <div>
      <Wrapper>{post.content}</Wrapper>
    </div>
  )
}

export default Post
