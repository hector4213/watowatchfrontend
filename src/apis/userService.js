import axios from 'axios'

const baseURL = 'http://localhost:3001'

const register = async (userData) => {
  const response = await axios.post(`${baseURL}/users`, userData)
  return response.data
}

const getUserLists = async (id) => {
  const response = await axios.get(`${baseURL}/users/lists/${id}`)
  return response.data
}

export default {
  register,
  getUserLists,
}
