import React, { useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router'

import { Title } from '../../assets/styles'
import { getPosts } from '../../services/posts'
import Post from './post'
import MakePost from './MakePost'
import ThreadButtons from '../threads/ThreadButtons'
import { UserContext } from '../user/UserProvider'

const Posts = () => {
  const [user] = useContext(UserContext)
  const [posts, setPosts] = useState([])

  const { boardName, threadName } = useParams()

  const updatePosts = async () => {
    const data = await getPosts(threadName)
    setPosts(data.sort((a, b) => a.id - b.id))
  }

  useEffect(() => {
    updatePosts()
  }, [])

  return (
    <div>
      <Title>{boardName}</Title>
      <Title>
        {threadName}
        {(user && posts[0]) && (user.id === posts[0].user_id || user.admin) &&
          <ThreadButtons />}
      </Title>
      {posts.map(post =>
        <Post key={post.id} post={post} updatePosts={updatePosts} />
      )}
      <MakePost updatePosts={updatePosts} />
    </div>
  )
}

export default Posts
