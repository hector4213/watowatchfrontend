import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import {
  Container,
  Typography,
  Grid,
  Dialog,
  Button,
  DialogTitle,
  List,
  ListItem,
  Snackbar,
} from '@material-ui/core'

import { Alert } from '@material-ui/lab'
import PosterSlides from './components/PosterSlides'

import userService from './apis/userService'
import listService from './apis/listService'

const UserProfile = ({ config, getUserLists, currentUser }) => {
  const [user, setUser] = useState(null)
  const [lists, setLists] = useState([])
  const [loggedUserLists, setLoggedUserLists] = useState([])
  const [isOpen, setIsOpen] = useState(false)
  const [snackOpen, setSnackOpen] = useState(false)
  const [message, setMessage] = useState(null)
  const [loading, setIsLoading] = useState(true)
  const [movie, setMovie] = useState(null)
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

  const listAdd = async (listId) => {
    try {
      await listService.addMovieToList(listId, movie)
      setSnackOpen(true)
      setMessage(`${movie.title} has been added!`)
      setTimeout(() => {
        handleClose()
      }, 600)
    } catch (error) {
      console.log(error)
    }
  }
  const buddyAdd = async (listId) => {
    const buddy = {
      buddyId: user.id,
    }
    try {
      const response = await listService.addBuddy(listId, buddy)
      setSnackOpen(true)
      setMessage(`${user.first_name} has been added!`)
      setTimeout(() => {
        handleClose()
      }, 600)
      console.log(response)
    } catch (error) {
      console.log(error)
    }
  }

  const handleAdd = async (listId) => {
    //if no movie then do add buddy call
    if (movie === null) {
      await buddyAdd(listId)
    } else {
      await listAdd(listId)
    }
  }

  const handleOpen = (movie) => {
    setMovie(movie)
    setIsOpen(true)
  }

  const handleClose = () => {
    setIsOpen(false)
    handleSnackClose()
    setMovie(null)
    setMessage(null)
  }

  const handleSnackClose = () => {
    setSnackOpen(false)
  }

  const handleAddBuddy = async (listId) => {
    setIsOpen(true)
    console.log(user.id)
  }

  if (loading) {
    return 'Loading....'
  }

  return (
    <Container>
      <Typography component='h1' variant='h3'>
        {`${user.first_name}'s Lists`}
      </Typography>
      <Button
        onClick={() => handleAddBuddy()}
        color='secondary'
        variant='contained'
      >
        Add as Buddy
      </Button>
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
        <Snackbar open={snackOpen} autoHideDuration={700} onClose={handleClose}>
          <Alert severity='success'>{message}</Alert>
        </Snackbar>
      </Dialog>
    </Container>
  )
}

export default UserProfile
