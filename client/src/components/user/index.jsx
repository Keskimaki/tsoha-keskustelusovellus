import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { getPostsByUser } from '../../services/posts'
import { Title } from '../../assets/styles'
import Post from '../posts/post'

const User = () => {
  const [posts, setPosts] = useState([])

  const { userId } = useParams()

  useEffect(async () => {
    const data = await getPostsByUser(userId)
    setPosts(data.sort((a, b) => b.id - a.id))
  }, [])

  if (posts.length === 0) {
    return <Title>No Posts</Title>
  }

  return (
    <div>
      {posts.map(post =>
        <Post key={post.id} post={post} />
      )}
    </div>
  )
}

export default User
