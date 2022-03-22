import React, { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {
  const [boards, setBoards] = useState([])

  const getBoards = async () => {
    const res = await axios.get('http://localhost:5000/api/boards')
    setBoards(res.data)
  }

  useEffect(() => {
    getBoards()
  }, [])

  return (
    <div>
      {boards.map(board => <p key={board.name}>{board.name} {board.description}</p>)}
    </div>
  )
}

export default App
