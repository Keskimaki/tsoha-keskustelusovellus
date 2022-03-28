import axios from 'axios'

import { BASE_URI } from '../config'
import { makePost } from './posts'

export const getThreads = async boardName => {
  const boardId = await getBoardId(boardName)

  const res = await axios.get(`${BASE_URI}/threads?board_id=${boardId}`)
  return res.data
}

export const makeThread = async (token, userId, boardName, name, content) => {
  const auth = { headers: { Authorization: token } }
  const boardId = await getBoardId(boardName)

  const newThread = {
    user_id: userId,
    board_id: boardId,
    name
  }

  const res = await axios.post(`${BASE_URI}/threads`, newThread, auth)

  await makePost(token, userId, name, content)

  return res.data
}

const getBoardId = async boardName => {
  const res = await axios.get(`${BASE_URI}/boards/${boardName}`)
  return res.data.id
}
