import React, { useState, useEffect } from 'react'

import Loader from './Loader'
import MovieCard from './MovieCard'

import { Paper, Grid } from '@material-ui/core'
import { FlashOn } from '@material-ui/icons'

import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  loaderContainer: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
  },
  paper: {
    padding: '10px',
    backgroundColor: '#f3ce13',
  },
}))

const LoadWinner = ({ winner, config }) => {
  const classes = useStyles()
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      setIsLoaded(true)
    }, 2500)
  })

  if (!isLoaded) {
    return (
      <div className={classes.loaderContainer}>
        <Loader size={80} />
      </div>
    )
  }
  console.log(winner)
  return (
    <Grid container alignItems='center' justify='space-evenly' spacing={1}>
      <Grid item xs={5}>
        <FlashOn color='secondary' size='large' />
      </Grid>
      <Grid item xs={13}>
        {winner.map((movie) => (
          <Paper elevation={3} className={classes.paper} variant='outlined'>
            <MovieCard
              title={movie.title}
              overview={movie.details.overview}
              src={
                config.base_url +
                config.poster_sizes[2] +
                movie.details.poster_path
              }
              year={movie.details.release_date.substring(0, 4)}
              key={movie.db_id}
              id={movie.db_id}
              tvdb={movie.details.id}
            />
          </Paper>
        ))}
      </Grid>
    </Grid>
  )
}

export default LoadWinner
