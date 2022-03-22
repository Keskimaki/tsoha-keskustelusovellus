import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router'

import { getThreads } from '../services/threads'

const Threads = () => {
  const [threads, setThreads] = useState([])

  const { boardName } = useParams()

  useEffect(async () => {
    const data = await getThreads(boardName)
    setThreads(data)
  }, [])

  console.log(threads)

  return (
    <div>
      <h1>{boardName}</h1>
      {threads.map(thread =>
        <p key={thread.name}>{thread.name}</p>
      )}
    </div>
  )
}

export default Threads
