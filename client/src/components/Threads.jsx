import React from 'react'
import { useParams } from 'react-router'

const Threads = () => {
  const { boardName } = useParams()

  return (
    <div>
      <h1>{boardName}</h1>
    </div>
  )
}

export default Threads
