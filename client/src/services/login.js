import axios from 'axios'

import { BASE_URI } from '../config'

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

export const logoutUser = setUser => {
  // TODO clear token in backend
  window.localStorage.removeItem('tsohaUser')
  setUser(undefined)
}
