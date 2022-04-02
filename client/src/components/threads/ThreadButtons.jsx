import React, { useContext } from 'react'
import { useParams } from 'react-router'
import { useNavigate } from 'react-router-dom'

import { SmallButton } from '../../assets/styles'
import { editThread, deleteThread } from '../../services/threads'
import { UserContext } from '../user/UserProvider'

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

  const handleThreadDeletion = async () => {
    if (!window.confirm('Are you sure you want to delete this thread?')) {
      return
    }

    await deleteThread(user.token, threadName)

    navigate('/')
  }

  return (
    <div>
        <SmallButton onClick={handleThreadNameEditing}>Edit</SmallButton>
        <SmallButton onClick={handleThreadDeletion}>Delete</SmallButton>
    </div>
  )
}

export default ThreadButtons
