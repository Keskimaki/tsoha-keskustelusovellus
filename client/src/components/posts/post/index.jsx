import React, { useContext } from 'react'

import { Wrapper, Text, SecondaryText, SecondaryTextRight } from '../../../assets/styles'
import { UserContext } from '../../UserProvider'
import PostButtons from './PostButtons'
import PostImage from './PostImage'

const Post = ({ post, updatePosts }) => {
  const [user] = useContext(UserContext)

  return (
      <Wrapper>
        <strong>{post.username} </strong>
        {post.admin && <SecondaryText>admin</SecondaryText>}
        <SecondaryTextRight>{post.time}</SecondaryTextRight>
        <Text>{post.content}</Text>
        {user && (user.id === post.user_id || user.admin) &&
          <PostButtons post={post} updatePosts={updatePosts} />}
        {post.image && <PostImage postId={post.id} />}
        {post.edit !== 'None' &&
          <SecondaryText>edited {post.edit.substring(0, 19)}</SecondaryText>}
      </Wrapper>
  )
}

export default Post
