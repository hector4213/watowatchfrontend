import React, { useState, useEffect } from 'react'
import tvdbService from './apis/tvdbService'

import {
  Container,
  Grid,
  Typography,
  Button,
  Paper,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
} from '@material-ui/core'

const Roulette = ({ getUserLists, user, config }) => {
  const [userLists, setUserLists] = useState([])
  const [selectedList, setSelectedList] = useState(null)
  const [basket, setBasket] = useState([])

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

  const handleListChange = (e) => {
    console.log(e.target.value)
    setSelectedList(e.target.value)
  }

  useEffect(() => {
    fetchData()
  }, [])

  if (user === null) {
    return 'Please login or create an account!'
  }

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
          <Grid item xs={12} md={8}>
            <FormControl style={{ width: '300px' }}>
              <InputLabel id='list-select-label'>Select your lists</InputLabel>
              <Select
                labelId='list-select-label'
                id='list-select'
                value={selectedList || ''}
                onChange={handleListChange}
              >
                {userLists.map((list) => (
                  <MenuItem key={list.title} value={list}>
                    {list.title}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Paper>
      </Grid>
      <div style={{ paddingTop: '50px' }}>
        {selectedList &&
          selectedList.movies.map((movie) => (
            <li key={movie.id}>{movie.title}</li>
          ))}
      </div>
    </Container>
  )
}

export default Roulette
