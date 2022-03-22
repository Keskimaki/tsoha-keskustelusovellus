import React from 'react'
import { Routes, Route } from 'react-router-dom'

import Boards from './components/Boards'
import Threads from './components/Threads'
import User from './components/User'
import Login from './components/Login'

const App = () => (
  <div>
    <Routes>
      <Route path="/" element={<Boards />} />
      <Route path="/:boardName" element={<Threads />} />
      <Route path="/create" element={<User />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  </div>
)

export default App
