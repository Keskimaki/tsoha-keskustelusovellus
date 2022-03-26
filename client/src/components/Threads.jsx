import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom'

import { getThreads } from '../services/threads'

const Threads = () => {
  const [threads, setThreads] = useState([])

  const { boardName } = useParams()

  useEffect(async () => {
    const data = await getThreads(boardName)
    setThreads(data)
  }, [])

  return (
    <div>
      <h1>{boardName}</h1>
      {threads.map(thread =>
        <Link to={`/${boardName}/${thread.name}`} key={thread.name}>
          <p key={thread.name}>{thread.name}</p>
        </Link>
      )}
    </div>
  )
}

export default Threads
