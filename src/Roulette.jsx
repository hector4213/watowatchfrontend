import React, { useState, useEffect } from 'react'
import tvdbService from './apis/tvdbService'

import {
  Container,
  Grid,
  Typography,
  Button,
  Paper,
  Select,
} from '@material-ui/core'

const Roulette = ({ getUserLists, user }) => {
  const [userLists, setUserLists] = useState([])

  const fetchData = async () => {
    if (user === null) {
      return
    }
    const userLists = await getUserLists(user.id)
    const promises = userLists.map(async (list) => {
      const movieDetailsPromises = list.movies.map((movie) =>
        tvdbService.getMovieDetails(movie)
      )
      const movieDetails = await Promise.all(movieDetailsPromises)
      return { ...list, movies: movieDetails }
    })
    const movieResponses = await Promise.all(promises)
    setUserLists(movieResponses)
  }

  useEffect(() => {
    fetchData()
  }, [user])

  if (user === null) {
    return 'Please login or create an account!'
  }

  const movieLists = userLists.map((list) => (
    <div>
      {list.title}
      <button>test</button>
      <p>
        {list.movies.map((movie) =>
          movie !== null ? <li>{movie.title}</li> : 'empty'
        )}
      </p>
    </div>
  ))

  return (
    <Container component='main'>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant='h4'>The Movie Roulette</Typography>
        </Grid>
        <Paper style={{ flexGrow: 1 }}>
          <Grid item container xs={12}>
            <Grid item xs={12} md={7}>
              <p>
                Select movies from your lists to add to the basket, a movie will
                be selected at random from your basket
              </p>
            </Grid>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant='subtitle1'>
              Please Select from your lists
            </Typography>
          </Grid>
        </Paper>
      </Grid>
      <div style={{ paddingTop: '50px' }}>{movieLists}</div>
    </Container>
  )
}

export default Roulette
