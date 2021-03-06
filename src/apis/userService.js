import axios from 'axios'

const baseURL = 'http://localhost:3001'

const register = async (userData) => {
  const response = await axios.post(`${baseURL}/users`, userData)
  return response.data
}

const getAllUsers = async () => {
  const response = await axios.get(`${baseURL}/users`)
  return response.data
}

const getProfile = async (id) => {
  const response = await axios.get(`${baseURL}/users/${id}`)
  return response.data
}

export default {
  register,
  getAllUsers,
  getProfile,
}
