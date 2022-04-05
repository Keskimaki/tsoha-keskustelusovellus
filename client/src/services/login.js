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
  window.localStorage.removeItem('tsohaUser')
  setUser(undefined)
}

export const checkLogin = async () => {
  let loggedIn = true

  let user = window.localStorage.getItem('tsohaUser')
  user = JSON.parse(user)

  const auth = { headers: { Authorization: user.token } }

  await axios.get(`${BASE_URI}/login`, auth).catch(err => {
    console.log(err)
    loggedIn = false
  })

  return loggedIn
}
