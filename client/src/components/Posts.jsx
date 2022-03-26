import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router'

import { getPosts } from '../services/posts'

const Posts = () => {
  const [posts, setPosts] = useState([])

  const { boardName, threadName } = useParams()

  useEffect(async () => {
    const data = await getPosts(threadName)
    setPosts(data)
  }, [])

  return (
    <div>
      <h1>{boardName}</h1>
      <p>{threadName}</p>
      {posts.map(post =>
        <p key={post.id}>{post.content}</p>
      )}
    </div>
  )
}

export default Posts
