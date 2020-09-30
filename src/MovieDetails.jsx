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
  console.log('these are recommended', recommend)
  console.log()

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
                <CircularProgress
                  variant='static'
                  value={movie.vote_average * 10}
                  color='secondary'
                />
              </Grid>
              <Grid item xs>
                {movie.overview}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <PosterSlides movieData={recommend} config={config} />
      </Container>
    </>
  )
}

export default MovieDetails
