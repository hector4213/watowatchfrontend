import axios from 'axios'

const trending = `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_TVDB_APIKEY}`
const tvdbConfig = `https://api.themoviedb.org/3/configuration?api_key=${process.env.REACT_APP_TVDB_APIKEY}`
const topRated = `https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.REACT_APP_TVDB_APIKEY}`
const upComing = `https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.REACT_APP_TVDB_APIKEY}`

const getImgConfig = async () => {
  const response = await axios.get(tvdbConfig)
  return response.data
}
const getTrending = async () => {
  const response = await axios.get(trending, {
    params: {
      language: 'en-US',
    },
  })
  return response.data
}

const getTopRated = async () => {
  const response = await axios.get(topRated, {
    params: {
      language: 'en-US',
    },
  })
  return response.data
}

const getUpAndComing = async () => {
  const response = await axios.get(upComing, {
    params: {
      language: 'en-US',
    },
  })
  return response.data
}

export default {
  getImgConfig,
  getTrending,
  getTopRated,
  getUpAndComing,
}
