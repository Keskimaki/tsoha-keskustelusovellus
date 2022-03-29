import React from 'react'

import { Wrapper } from '../../assets/styles'

const Board = ({ board }) => (
  <Wrapper>
    <strong>{board.name}</strong>
    <br />
    {board.description}
  </Wrapper>
)

export default Board
