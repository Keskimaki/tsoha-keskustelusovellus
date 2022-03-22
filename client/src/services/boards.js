import axios from 'axios'

import { BASE_URI } from '../config'

export const getBoards = async () => {
  const res = await axios.get(`${BASE_URI}/boards`)
  return res.data
}
