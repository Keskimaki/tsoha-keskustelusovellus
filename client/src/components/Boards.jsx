import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import { getBoards } from '../services/boards'

const Boards = () => {
  const [boards, setBoards] = useState([])

  useEffect(async () => {
    const data = await getBoards()
    setBoards(data)
  }, [])

  return (
    <div>
      {boards.map(board =>
        <Link to={`/${board.name}`} key={board.name}>
          <p>{board.name} {board.description}</p>
        </Link>
      )}
    </div>
  )
}

export default Boards
