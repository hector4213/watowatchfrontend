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
  },
  ribbon: {
    color: '#f3ce13',
  },
  iconContainer: {
    display: 'flex',
    width: '100%',
    justifyContent: 'center',
  },
  winnerText: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    justifyContent: 'center',
    textAlign: 'center',
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
    <Grid container spacing={3} alignItems='center' justify='space-evenly'>
      <Grid item xs={11} md={5}>
        <div className={classes.winnerText}>
          <Typography variant='subtitle1'>{`Your movie Tonight is ${winner[0].details.original_title}`}</Typography>
          <Typography variant='caption'>{`${winner[0].details.tagline}`}</Typography>
        </div>
      </Grid>
      <Grid item xs={11} md={1}>
        <div className={classes.iconContainer}>
          <NewReleases
            className={classes.ribbon}
            color='secondary'
            fontSize='large'
          />
        </div>
      </Grid>
      <Grid item xs={5} md={2}>
        {' '}
        {winner.map((movie) => (
          <Paper
            elevation={3}
            className={classes.paper}
            key={movie.id}
            variant='outlined'
          >
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
