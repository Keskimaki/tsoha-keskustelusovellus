import React, { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'

import Boards from './components/Boards'
import Threads from './components/Threads'
import User from './components/User'
import Login from './components/Login'

const App = () => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const userData = window.localStorage.getItem('tsohaUser')

    if (userData) {
      setUser(userData)
    }

    console.log(user)
  }, [])

  return (
    <div>
      <Routes>
        <Route path="/" element={<Boards />} />
        <Route path="/:boardName" element={<Threads />} />
        <Route path="/create" element={<User />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  )
}

export default App
