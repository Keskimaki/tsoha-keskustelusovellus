import React from 'react'

import { Placeholder } from '../../assets/styles'

const Thread = ({ thread }) => {
  return (
    <div>
      <Placeholder>{thread.name}</Placeholder>
    </div>
  )
}

export default Thread
