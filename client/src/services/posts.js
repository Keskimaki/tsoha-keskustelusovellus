import axios from 'axios'

import { BASE_URI } from '../config'

export const getPosts = async threadName => {
  const threadId = await getThreadId(threadName)

  const res = await axios.get(`${BASE_URI}/posts?thread_id=${threadId}`)
  return res.data
}

export const getPostsByUser = async userId => {
  const res = await axios.get(`${BASE_URI}/posts?user_id=${userId}`)
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

export const getThreadId = async threadName => {
  const res = await axios.get(`${BASE_URI}/threads/${threadName}`)
  return res.data.id
}

export const editPost = async (token, postId, content) => {
  const auth = { headers: { Authorization: token } }

  const res = await axios.put(`${BASE_URI}/posts/${postId}`, { content }, auth)
  return res.data
}

export const deletePost = async (token, postId) => {
  const auth = { headers: { Authorization: token } }

  const res = await axios.delete(`${BASE_URI}/posts/${postId}`, auth)
  return res.data
}
