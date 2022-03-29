import React, { useState, useEffect } from 'react'

import { getBoards } from '../services/boards'
import { Link, Wrapper } from '../assets/styles'

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
          <Wrapper>{board.name} {board.description}</Wrapper>
        </Link>
      )}
    </div>
  )
}

export default Boards
