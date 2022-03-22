import React, { useState, useEffect } from 'react'
import { Routes, Route } from "react-router-dom"

import Boards from './components/Boards'
import { getBoards } from './services/boards'

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
      </Routes>
    </div>
  )
}

export default App
