import React from 'react'

const Boards = ({ boards }) => (
  <div>
    {boards.map(board => 
      <p key={board.name}>{board.name} {board.description}</p>
    )}
  </div>
)

export default Boards
