import React, { useState, useEffect, createContext } from 'react'

export const UserContext = createContext()

const UserProvider = props => {
  const [user, setUser] = useState(undefined)

  useEffect(() => {
    const userData = window.localStorage.getItem('tsohaUser')

    if (userData) {
      setUser(JSON.parse(userData))
    }
  }, [user])

  return (
    <UserContext.Provider value={[user, setUser]}>
      {props.children}
    </UserContext.Provider>
  )
}

export default UserProvider
