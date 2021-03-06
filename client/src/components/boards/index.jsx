import React, { useState, useEffect } from 'react'

import { getBoards } from '../../services/boards'
import { Link } from '../../assets/styles'
import Board from './Board'

const Boards = () => {
  const [boards, setBoards] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const data = await getBoards()
      setBoards(data)
    }
    fetchData()
  }, [])

  return (
    <div>
      {boards.map(board =>
        <Link to={`/${board.name}`} key={board.name}>
          <Board board={board} />
        </Link>
      )}
    </div>
  )
}

export default Boards
