import axios from 'axios'

import { BASE_URI } from '../config'

export const getPosts = async threadName => {
  const threadId = await getThreadId(threadName)

  const res = await axios.get(`${BASE_URI}/posts?thread_id=${threadId}`)
  return res.data
}

const getThreadId = async threadName => {
  const res = await axios.get(`${BASE_URI}/threads/${threadName}`)
  return res.data.id
}
