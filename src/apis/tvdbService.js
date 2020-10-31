import axios from 'axios'

const baseURL = `https://api.themoviedb.org/3`

const config = {
  params: {
    language: 'en-US',
    api_key: process.env.REACT_APP_TVDB_APIKEY,
  },
}

const getImgConfig = async () => {
  const response = await axios.get(`${baseURL}/configuration`, config)
  return response.data.images
}
const getTrending = async () => {
  const response = await axios.get(`${baseURL}/movie/popular`, config)
  return response.data.results
}

const getTopRated = async () => {
  const response = await axios.get(`${baseURL}/movie/top_rated`, config)
  return response.data.results
}

const getUpAndComing = async () => {
  const response = await axios.get(`${baseURL}/movie/upcoming`, config)
  return response.data.results
}

const getMovieDetails = async (id) => {
  const response = await axios.get(`${baseURL}/movie/${id}`, config)
  return response.data
}

const getRecommendations = async (id) => {
  const response = await axios.get(
    `${baseURL}/movie/${id}/recommendations`,
    config
  )
  return response.data.results
}

const searchMovies = async (query) => {
  const response = await axios.get(`${baseURL}/search/movie`, {
    params: {
      language: 'en-US',
      api_key: process.env.REACT_APP_TVDB_APIKEY,
      query: `${query}`,
    },
  })
  return response.data.results
}

export default {
  getImgConfig,
  getTrending,
  getTopRated,
  getUpAndComing,
  getMovieDetails,
  getRecommendations,
  searchMovies,
}
