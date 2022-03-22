import React, { useState, useEffect } from 'react'

import Boards from './components/Boards'
import { getBoards } from './services/boards'

const App = () => {
  const [boards, setBoards] = useState([])

  useEffect(async () => {
    const data = await getBoards()
    setBoards(data)
  }, [])

  return (
    <div>
      <Boards boards={boards} />
    </div>
  )
}

export default App
