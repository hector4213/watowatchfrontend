import axios from 'axios'

const trending = `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_TVDB_APIKEY}`
const tvdbConfig = `https://api.themoviedb.org/3/configuration?api_key=${process.env.REACT_APP_TVDB_APIKEY}`

const getImgConfig = async () => {
  const response = await axios.get(tvdbConfig)
  return response.data
}
const getTrending = async () => {
  const response = await axios.get(trending, {
    params: {
      language: 'en - US',
    },
  })
  return response.data
}

export default {
  getImgConfig,
  getTrending,
}
