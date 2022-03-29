import React from 'react'

import { Wrapper } from '../../assets/styles'

const Post = ({ post }) => {
  return (
      <Wrapper>
        <strong>{post.username}</strong>
        <br />
        {post.content} {post.username}
      </Wrapper>
  )
}

export default Post
