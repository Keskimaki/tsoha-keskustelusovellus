import axios from 'axios'

import { BASE_URI } from '../config'

export const getPosts = async threadName => {
  const threadId = await getThreadId(threadName)

  const res = await axios.get(`${BASE_URI}/posts?thread_id=${threadId}`)
  return res.data
}

export const makePost = async (token, userId, threadName, content) => {
  const auth = { headers: { Authorization: token } }
  const threadId = await getThreadId(threadName)

  const newPost = {
    user_id: userId,
    thread_id: threadId,
    content
  }

  const res = await axios.post(`${BASE_URI}/posts`, newPost, auth)
  return res.data
}

const getThreadId = async threadName => {
  const res = await axios.get(`${BASE_URI}/threads/${threadName}`)
  return res.data.id
}
