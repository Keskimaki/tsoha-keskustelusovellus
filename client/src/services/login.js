import { useContext } from 'react'
import axios from 'axios'

import { BASE_URI } from '../config'
import { UserContext } from '../components/UserProvider'

// eslint-disable-next-line no-unused-vars
const [user, setUser] = useContext(UserContext)

export const loginUser = async (username, password) => {
  const data = { username, password }

  try {
    const res = await axios.post(`${BASE_URI}/login`, data)
    return res.data
  }
  catch (err) {
    console.log(err)
  }
}

export const logoutUser = () => {
  window.localStorage.removeItem('tsohaUser')
  setUser(undefined)
}
