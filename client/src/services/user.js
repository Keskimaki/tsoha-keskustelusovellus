import axios from 'axios'

import { BASE_URI } from '../config'

export const createUser = async (username, password) => {
  const data = { username, password }
  const res = await axios.post(`${BASE_URI}/users`, data)

  return res.data
}

export const updateUser = (context, newUser) => {
  // eslint-disable-next-line no-unused-vars
  const [user, setUser] = context

  window.localStorage.setItem('tsohaUser', JSON.stringify(newUser))
  setUser(newUser)
}
