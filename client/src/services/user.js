import axios from 'axios'

import { BASE_URI } from '../config'

export const createUser = async (username, password) => {
  const data = { username, password }
  const res = await axios.post(`${BASE_URI}/users`, data)

  return res.data
}
