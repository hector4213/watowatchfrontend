import axios from 'axios'

const baseURL = 'http://localhost:3001'

let token = null

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

//Route to make new movie list
const createList = async (titleName) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = axios.post(`${baseURL}/lists`, titleName, config)
  return response.data
}

//Route to get all movie lists from all users
const getLists = async () => {
  const response = await axios.get(baseURL)
  return response.data
}

// Route to get list by id
const getListById = async (id) => {
  const response = await axios.get(`${baseURL}/${id}`)
  return response.data
}

// Route to add a movie to list
const addMovieToList = async (id, movieObj) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.put(`${baseURL}/lists/${id}`, movieObj, config)
  return response.data
}

//Route to remove a movie from a list
const removeMovieFromList = async (listId, deletedObj) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.put(
    `${baseURL}/lists/${listId}/movies`,
    deletedObj,
    config
  )
  return response.data
}

//Route to add a buddy to a list

const addBuddy = async (listId, buddy) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = axios.post(
    `${baseURL}/lists/${listId}/buddies/add`,
    buddy,
    config
  )
  return response.data
}

const removeBuddy = async (id) => {
  const response = axios.delete(`${baseURL}/${id}/buddies/delete`)
  return response.data
}

export default {
  createList,
  getLists,
  getListById,
  addMovieToList,
  removeMovieFromList,
  addBuddy,
  removeBuddy,
  setToken,
}
