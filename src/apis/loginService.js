import axios from 'axios'

const baseURL = `https://watowatchbackend.herokuapp.com/login`

const login = async (credentials) => {
  const response = await axios.post(baseURL, credentials)
  return response.data
}

export default { login }
