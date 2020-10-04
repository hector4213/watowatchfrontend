import axios from 'axios'

const baseURL = 'http://localhost:3001'

const register = async (userData) => {
  const response = await axios.post(`${baseURL}/users`, userData)
  return response.data
}

export default {
  register,
}
