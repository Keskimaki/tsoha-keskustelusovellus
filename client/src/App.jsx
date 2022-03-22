import React, { useState, useEffect } from 'react'
import { Routes, Route } from "react-router-dom"

import { getBoards } from './services/boards'

import Boards from './components/Boards'
import User from './components/User'
import Login from './components/Login'

const App = () => {
  const [boards, setBoards] = useState([])

  useEffect(async () => {
    const data = await getBoards()
    setBoards(data)
  }, [])

  return (
    <div>
      <Routes>
        <Route path="" element={<Boards boards={boards} />} />
        <Route path="/create" element={<User />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  )
}

export default App
