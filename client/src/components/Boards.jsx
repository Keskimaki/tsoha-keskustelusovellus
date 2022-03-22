import React from 'react'
import { Link } from 'react-router-dom'

const Boards = ({ boards }) => {
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
