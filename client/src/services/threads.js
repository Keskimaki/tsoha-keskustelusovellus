import axios from 'axios'

import { BASE_URI } from '../config'

export const getThreads = async (boardName) => {
  const boardId = await getBoardId(boardName)

  const res = await axios.get(`${BASE_URI}/threads?board_id=${boardId}`)
  return res.data
}

const getBoardId = async boardName => {
  const res = await axios.get(`${BASE_URI}/boards/${boardName}`)
  return res.data.id
}
