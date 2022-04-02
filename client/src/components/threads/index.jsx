import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router'

import { getThreads } from '../../services/threads'
import { Title, Link } from '../../assets/styles'
import Thread from './Thread'
import MakeThread from './MakeThread'

const Threads = () => {
  const [threads, setThreads] = useState([])

  const { boardName } = useParams()

  useEffect(async () => {
    const data = await getThreads(boardName)
    setThreads(data.sort((a, b) => b.id - a.id))
  }, [])

  return (
    <div>
      <Title>{boardName}</Title>
      {threads.map(thread =>
        <Link to={`/${boardName}/${thread.name}`} key={thread.name}>
          <Thread key={thread.name} thread={thread} />
        </Link>
      )}
      <MakeThread setThreads={setThreads} />
    </div>
  )
}

export default Threads
