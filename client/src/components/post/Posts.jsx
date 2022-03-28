import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router'

import { Title, Placeholder } from '../../assets/styles'
import { getPosts } from '../../services/posts'
import MakePost from './MakePost'

const Posts = () => {
  const [posts, setPosts] = useState([])

  const { boardName, threadName } = useParams()

  useEffect(async () => {
    const data = await getPosts(threadName)
    setPosts(data)
  }, [])

  return (
    <div>
      <Title>{boardName}</Title>
      <Title>{threadName}</Title>
      {posts.map(post =>
        <Placeholder key={post.id}>{post.content}</Placeholder>
      )}
      <MakePost setPosts={setPosts} />
    </div>
  )
}

export default Posts
