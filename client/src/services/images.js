import axios from 'axios'

import { BASE_URI } from '../config'

export const removeImage = async (token, postId) => {
  const auth = { headers: { Authorization: token } }

  const res = await axios.delete(`${BASE_URI}/images/${postId}`, auth)
  return res.data
}
