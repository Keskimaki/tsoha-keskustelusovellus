import React, { useState, useEffect } from 'react'

import { getBoards } from '../services/boards'
import { Link, Placeholder } from '../assets/styles'

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
          <Placeholder>{board.name} {board.description}</Placeholder>
        </Link>
      )}
    </div>
  )
}

export default Boards
