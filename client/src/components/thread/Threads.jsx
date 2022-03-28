import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router'

import { getThreads } from '../../services/threads'
import { Title, Link, Placeholder } from '../../assets/styles'
import MakeThread from './MakeThread'

const Threads = () => {
  const [threads, setThreads] = useState([])

  const { boardName } = useParams()

  useEffect(async () => {
    const data = await getThreads(boardName)
    setThreads(data)
  }, [])

  return (
    <div>
      <Title>{boardName}</Title>
      {threads.map(thread =>
        <Link to={`/${boardName}/${thread.name}`} key={thread.name}>
          <Placeholder key={thread.name}>{thread.name}</Placeholder>
        </Link>
      )}
      <MakeThread setThreads={setThreads} />
    </div>
  )
}

export default Threads
