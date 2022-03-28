import React from 'react'

import { Placeholder } from '../../assets/styles'

const Post = ({ post }) => {
  return (
    <div>
      <Placeholder>{post.content}</Placeholder>
    </div>
  )
}

export default Post
