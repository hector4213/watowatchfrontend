import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import PosterSlides from './components/PosterSlides'
import UserRating from './components/UserRating'
import listService from './apis/listService'
import {
  Container,
  Grid,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  List,
  ListItem,
  Snackbar,
} from '@material-ui/core'
import { Alert } from '@material-ui/lab'

import { Face } from '@material-ui/icons'

const MovieDetails = ({
  config,
  getMovieDetails,
  getUserLists,
  user,
  getBuddiedLists,
}) => {
  const movieId = useParams().id
  const [movie, setMovie] = useState({})
  const [recommend, setRecommend] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isOpen, setIsOpen] = useState(false)
  const [snackOpen, setSnackOpen] = useState(false)
  const [message, setMessage] = useState(null)
  const [userLists, setUserLists] = useState([])

  useEffect(() => {
    const getDetails = async () => {
      const responses = await getMovieDetails(movieId)
      console.log(responses)
      setMovie(responses[0])
      const addDetails = responses[1].map((movie) => {
        return {
          details: movie,
        }
      })
      setRecommend(addDetails)
      setIsLoading(false)
    }
    getDetails()
  }, [movieId])

  useEffect(() => {
    const fetchData = async () => {
      const data = getUserLists(user.id)
      const buddyData = getBuddiedLists(user.id)
      const responses = await Promise.all([data, buddyData])
      console.log(responses[0], responses[1])
      setUserLists([...responses[0], ...responses[1]])
    }
    fetchData()
  }, [])

  if (isLoading) {
    return null
  }
  console.log('these are recommended', recommend)
  console.log()
  const handleOpen = () => {
    setIsOpen(true)
  }

  const handleAdd = async (listId) => {
    try {
      const movieToAdd = {
        title: movie.original_title,
        genre: movie.genres[0].name,
        tvdb_movieid: movie.id,
      }
      await listService.addMovieToList(listId, movieToAdd)
      setSnackOpen(true)
      setMessage(`${movieToAdd.title} has been added!`)
      getUserLists(user.id) //works but can i handle this better instead of another api call?
    } catch (error) {
      console.log(error)
    }
  }

  const handleClose = () => {
    setSnackOpen(false)
    setIsOpen(false)
    setTimeout(() => {
      setMessage(null)
    })
  }

  return (
    <>
      <Container>
        <Grid container spacing={2}>
          <Grid item>
            <img
              src={config.base_url + config.poster_sizes[3] + movie.poster_path}
              alt='poster'
            />
          </Grid>
          <Grid item xs={12} sm container>
            <Grid item xs container direction='column' spacing={2}>
              <Grid item xs={2} />
              <Grid item xs={3}>
                <Typography variant='h6' gutterBottom>
                  {movie.original_title}
                </Typography>
              </Grid>
              <Grid item>
                <UserRating value={movie.vote_average * 10} />
                <Button onClick={handleOpen}>Add to list</Button>
              </Grid>
              <Grid item xs>
                {movie.overview}
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <PosterSlides movieData={recommend} config={config} />
          </Grid>
        </Grid>

        <Dialog selectedvalue={userLists} open={isOpen} onClose={handleClose}>
          <DialogTitle id='list-selection'>Select your list</DialogTitle>
          <List>
            {userLists.map((list) => (
              <ListItem
                key={list.list_id}
                onClick={() => handleAdd(list.list_id)}
              >
                {list.title}
                {list.user_id !== user.id ? <Face /> : null}
              </ListItem>
            ))}
          </List>
          <Snackbar
            open={snackOpen}
            autoHideDuration={700}
            onClose={handleClose}
          >
            <Alert severity='success'>{message}</Alert>
          </Snackbar>
        </Dialog>
      </Container>
    </>
  )
}

export default MovieDetails
