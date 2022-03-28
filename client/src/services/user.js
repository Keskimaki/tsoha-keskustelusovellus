import { useContext } from 'react'
import axios from 'axios'

import { BASE_URI } from '../config'
import { UserContext } from '../components/UserProvider'

// eslint-disable-next-line
const [user, setUser] = useContext(UserContext)

export const createUser = async (username, password) => {
  const data = { username, password }
  const res = await axios.post(`${BASE_URI}/users`, data)

  return res.data
}

export const updateUser = newUser => {
  window.localStorage.setItem('tsohaUser', JSON.stringify(newUser))
  setUser(newUser)
}
