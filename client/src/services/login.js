import axios from 'axios'

const url = 'http://localhost:5000/api/login'

export const loginUser = async (username, password) => {
  const data = { username, password }

  try {
    const res = await axios.post(url, data)
    return res.data
  }
  catch (err) {
    console.log(err)
  }
}
