import React from 'react'

import { Wrapper } from '../../assets/styles'

const Thread = ({ thread }) => {
  return (
    <div>
      <Wrapper>{thread.name}</Wrapper>
    </div>
  )
}

export default Thread
