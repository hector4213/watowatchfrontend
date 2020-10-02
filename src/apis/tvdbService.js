import axios from 'axios'

const tvdbConfig = `https://api.themoviedb.org/3/configuration`

const baseURL = `https://api.themoviedb.org/3/movie`

const apiParams = {
  language: 'en-US',
  api_key: process.env.REACT_APP_TVDB_APIKEY,
}

const getImgConfig = async () => {
  const response = await axios.get(tvdbConfig, {
    params: apiParams,
  })
  return response.data.images
}
const getTrending = async () => {
  const response = await axios.get(`${baseURL}/popular`, {
    params: {
      apiParams,
    },
  })
  return response.data.results
}

const getTopRated = async () => {
  const response = await axios.get(`${baseURL}/top_rated`, {
    params: {
      apiParams,
    },
  })
  return response.data.results
}

const getUpAndComing = async () => {
  const response = await axios.get(`${baseURL}/upcoming`, {
    params: {
      apiParams,
    },
  })
  return response.data.results
}

const getMovieDetails = async (id) => {
  const response = await axios.get(`${baseURL}/${id}`, {
    params: {
      apiParams,
    },
  })
  return response.data
}

const getRecommendations = async (id) => {
  const response = await axios.get(`${baseURL}/${id}/recommendations`, {
    params: {
      apiParams,
    },
  })
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
