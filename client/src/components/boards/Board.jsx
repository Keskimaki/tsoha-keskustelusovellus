import React from 'react'

import { Wrapper } from '../../assets/styles'

const Board = ({ board }) => (
  <Wrapper>
    {board.name} {board.description}
  </Wrapper>
)

export default Board
