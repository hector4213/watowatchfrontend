import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import PosterSlides from './components/PosterSlides'
import UserRating from './components/UserRating'

import {
  Container,
  Grid,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  List,
  ListItem,
} from '@material-ui/core'

const MovieDetails = ({ config, getMovieDetails, userLists }) => {
  const movieId = useParams().id
  const [movie, setMovie] = useState([])
  const [recommend, setRecommend] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isOpen, setIsOpen] = useState(false)
  console.log(userLists)

  useEffect(() => {
    const getDetails = async () => {
      await getMovieDetails(movieId).then((responses) => {
        setMovie(responses[0])
        setRecommend(responses[1].results)
        setIsLoading(false)
      })
    }
    getDetails()
  }, [movieId])

  if (isLoading) {
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
                <UserRating value={movie.vote_average * 10} />
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
