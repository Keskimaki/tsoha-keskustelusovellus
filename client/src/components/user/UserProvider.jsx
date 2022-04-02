import React, { useState, useEffect, createContext } from 'react'

import { checkLogin } from '../../services/login'

export const UserContext = createContext()

const UserProvider = props => {
  const [user, setUser] = useState(undefined)

  const updateLoginStatus = async () => {
    const userData = window.localStorage.getItem('tsohaUser')
    if (!userData) {
      return
    }

    const loggedIn = await checkLogin()
    if (loggedIn) {
      setUser(JSON.parse(userData))
    }
    else {
      window.localStorage.removeItem('tsohaUser')
    }
  }

  useEffect(async () => {
    await updateLoginStatus()
  }, [])

  return (
    <UserContext.Provider value={[user, setUser]}>
      {props.children}
    </UserContext.Provider>
  )
}

export default UserProvider
