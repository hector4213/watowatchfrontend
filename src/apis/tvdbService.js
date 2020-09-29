import axios from 'axios'

const tvdbConfig = `https://api.themoviedb.org/3/configuration`

const baseURL = `https://api.themoviedb.org/3/movie`

const getImgConfig = async () => {
  const response = await axios.get(tvdbConfig, {
    params: {
      api_key: process.env.REACT_APP_TVDB_APIKEY,
    },
  })
  return response.data
}
const getTrending = async () => {
  const response = await axios.get(`${baseURL}/popular`, {
    params: {
      language: 'en-US',
      api_key: process.env.REACT_APP_TVDB_APIKEY,
    },
  })
  return response.data
}

const getTopRated = async () => {
  const response = await axios.get(`${baseURL}/top_rated`, {
    params: {
      language: 'en-US',
      api_key: process.env.REACT_APP_TVDB_APIKEY,
    },
  })
  return response.data
}

const getUpAndComing = async () => {
  const response = await axios.get(`${baseURL}/upcoming`, {
    params: {
      language: 'en-US',
      api_key: process.env.REACT_APP_TVDB_APIKEY,
    },
  })
  return response.data
}

const getMovieDetails = async (id) => {
  const response = await axios.get(`${baseURL}/${id}`, {
    params: {
      language: 'en-US',
      api_key: process.env.REACT_APP_TVDB_APIKEY,
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
}
