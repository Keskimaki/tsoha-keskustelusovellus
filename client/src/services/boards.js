import axios from 'axios'

const url = 'http://localhost:5000/api/boards'

export const getBoards = async () => {
  const res = await axios.get(url)
  return res.data
}
