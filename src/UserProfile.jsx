import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import {
  Container,
  Typography,
  Grid,
  Dialog,
  DialogTitle,
  List,
  ListItem,
} from '@material-ui/core'
import PosterSlides from './components/PosterSlides'

import userService from './apis/userService'
import listService from './apis/listService'

const UserProfile = ({ config, getUserLists, currentUser }) => {
  const [user, setUser] = useState(null)
  const [lists, setLists] = useState([])
  const [loggedUserLists, setLoggedUserLists] = useState([])
  const [isOpen, setIsOpen] = useState(false)
  const [loading, setIsLoading] = useState(true)
  const [movie, setMovie] = useState({})
  const userProfile = useParams().id

  const fetchUserData = async () => {
    const userData = await userService.getProfile(userProfile)
    const listData = await getUserLists(userProfile)
    const currentUserLists = await getUserLists(currentUser)
    const responses = await Promise.all([userData, listData, currentUserLists])
    setUser(responses[0])
    setLists(responses[1])
    setLoggedUserLists(responses[2])
    setIsLoading(false)
  }

  useEffect(() => {
    fetchUserData()
  }, [])

  const handleAdd = async (listId) => {
    try {
      await listService.addMovieToList(listId, movie)
      getUserLists(user.id) //works but can i handle this better instead of another api call?
    } catch (error) {
      console.log(error)
    }
  }

  const handleOpen = (movie) => {
    setMovie(movie)
    setIsOpen(true)
  }

  const handleClose = () => {
    setIsOpen(false)
  }
  console.log(movie)

  if (loading) {
    return 'Loading....'
  }

  return (
    <Container>
      <Typography component='h1' variant='h3'>
        {`${user.first_name}'s Lists`}
      </Typography>
      <Grid container spacing={3}>
        {lists.map((list) => (
          <>
            <Grid item xs={12} key={list.list_id}>
              {list.title}
            </Grid>
            <Grid item xs={12}>
              <PosterSlides
                hasDelete={false}
                hasAdd={true}
                movieData={list.movies}
                config={config}
                handleDialogOpen={handleOpen}
                setMovie={setMovie}
              />
            </Grid>
          </>
        ))}
      </Grid>
      <Dialog
        selectedvalue={loggedUserLists}
        open={isOpen}
        onClose={handleClose}
      >
        <DialogTitle id='list-selection'>Select your list</DialogTitle>
        <List>
          {loggedUserLists.map((list) => (
            <ListItem
              key={list.list_id}
              onClick={() => handleAdd(list.list_id)}
            >
              {list.title}
            </ListItem>
          ))}
        </List>
      </Dialog>
    </Container>
  )
}

export default UserProfile
