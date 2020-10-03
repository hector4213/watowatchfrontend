import axios from 'axios'

const tvdbConfig = `https://api.themoviedb.org/3/configuration`

const baseURL = `https://api.themoviedb.org/3/movie`

const config = {
  params: {
    language: 'en-US',
    api_key: process.env.REACT_APP_TVDB_APIKEY,
  },
}

const getImgConfig = async () => {
  const response = await axios.get(tvdbConfig, config)
  return response.data.images
}
const getTrending = async () => {
  const response = await axios.get(`${baseURL}/popular`, config)
  return response.data.results
}

const getTopRated = async () => {
  const response = await axios.get(`${baseURL}/top_rated`, config)
  return response.data.results
}

const getUpAndComing = async () => {
  const response = await axios.get(`${baseURL}/upcoming`, config)
  return response.data.results
}

const getMovieDetails = async (id) => {
  const response = await axios.get(`${baseURL}/${id}`, config)
  return response.data
}

const getRecommendations = async (id) => {
  const response = await axios.get(`${baseURL}/${id}/recommendations`, config)
  return response.data
}

export default {
  getImgConfig,
  getTrending,
  getTopRated,
  getUpAndComing,
  getMovieDetails,
  getRecommendations,
}
