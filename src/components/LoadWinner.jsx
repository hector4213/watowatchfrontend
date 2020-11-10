import React, { useState, useEffect } from 'react'

import Loader from './Loader'
import MovieCard from './MovieCard'

import { Paper, Grid, Typography } from '@material-ui/core'
import { NewReleases } from '@material-ui/icons'

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
    padding: '5px',
    backgroundColor: '#f3ce13',
    display: 'flex',
    justifyContent: 'center',
  },
  ribbon: {
    color: '#f3ce13',
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
    <Grid container spacing={3} alignItems='center' justify='space-around'>
      <Grid item xs={4}>
        <Typography variant='subtitle1'>{`Your movie Tonight is ${winner[0].details.original_title}`}</Typography>
        <Typography variant='caption'>{`${winner[0].details.tagline}`}</Typography>
      </Grid>
      <Grid item xs={1}>
        <NewReleases
          className={classes.ribbon}
          color='secondary'
          fontSize='large'
        />
      </Grid>
      <Grid item xs={3}>
        {' '}
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
