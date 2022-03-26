import React, { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'

import Header from './components/Header'
import Boards from './components/Boards'
import Threads from './components/Threads'
import Posts from './components/Posts'
import User from './components/User'
import Login from './components/Login'
import Footer from './components/Footer'

const App = () => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const userData = window.localStorage.getItem('tsohaUser')

    if (userData) {
      setUser(JSON.parse(userData))
    }

    console.log(user)
  }, [])

  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Boards />} />
        <Route path="/:boardName" element={<Threads />} />
        <Route path="/:boardName/:threadName" element={<Posts />} />
        <Route path="/create" element={<User />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
