import React, { useState, useEffect } from 'react'
import tvdbService from './apis/tvdbService'
import { useParams } from 'react-router-dom'

import {
  Container,
  Grid,
  Typography,
  IconButton,
  CircularProgress,
} from '@material-ui/core'

import { AddCircle } from '@material-ui/icons'

const MovieDetails = () => {
  const id = useParams().id
  const [movie, setMovie] = useState([])
  const [recommend, setRecommend] = useState([])
  const [config, setConfig] = useState([])
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const getDetails = async () => {
      const responses = await Promise.all([
        tvdbService.getImgConfig(),
        tvdbService.getMovieDetails(id),
        tvdbService.getRecommendations(id),
      ])
      setConfig(responses[0].images)
      setMovie(responses[1])
      setRecommend(responses[2].results)
      setIsLoaded(true)
    }
    getDetails()
  }, [id])

  if (!isLoaded) {
    return null
  }

  return (
    <>
      <Container>
        <Grid container spacing={3}>
          <Grid item xs={4}>
            <img
              src={config.base_url + config.poster_sizes[3] + movie.poster_path}
              alt='poster'
            />
          </Grid>
          <Grid item container xs={8} direction='row'>
            <Grid item xs={12}>
              <Typography variant='h6' gutterBottom>
                {movie.original_title}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              {movie.overview}
            </Grid>
            <Grid item xs={12} container alignItems='center'>
              <Grid item xs={2}>
                <CircularProgress
                  variant='static'
                  value={movie.vote_average * 10}
                />
              </Grid>
              <Grid item xs={4}>
                <IconButton>
                  <AddCircle color='secondary' fontSize='large' />
                </IconButton>
                <Typography display='inline'>Add to List</Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </>
  )
}

export default MovieDetails
