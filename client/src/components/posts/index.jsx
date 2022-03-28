import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router'

import { Title } from '../../assets/styles'
import { getPosts } from '../../services/posts'
import Post from './Post'
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
        <Post key={post.id} post={post} />
      )}
      <MakePost setPosts={setPosts} />
    </div>
  )
}

export default Posts
