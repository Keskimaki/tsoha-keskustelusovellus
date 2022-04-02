import React, { useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router'
import { useNavigate } from 'react-router-dom'

import { Title, SmallButton } from '../../assets/styles'
import { getPosts } from '../../services/posts'
import { editThread } from '../../services/threads'
import Post from './post'
import MakePost from './MakePost'
import { UserContext } from '../UserProvider'

const Posts = () => {
  const [user] = useContext(UserContext)
  const [posts, setPosts] = useState([])

  const { boardName, threadName } = useParams()

  const updatePosts = async () => {
    const data = await getPosts(threadName)
    setPosts(data)
  }

  useEffect(async () => {
    await updatePosts()
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
      <MakePost setPosts={setPosts} />
    </div>
  )
}

const ThreadButtons = () => {
  const navigate = useNavigate()
  const [user] = useContext(UserContext)
  const { boardName, threadName } = useParams()

  const handleThreadNameEditing = async () => {
    const name = window.prompt('Edit thread title:', threadName)

    if (!name) {
      return
    }

    await editThread(user.token, threadName, name)

    navigate(`/${boardName}/${name}`)
  }

  return (
    <div>
        <SmallButton onClick={handleThreadNameEditing}>Edit</SmallButton>
        <SmallButton>Delete</SmallButton>
    </div>
  )
}

export default Posts
