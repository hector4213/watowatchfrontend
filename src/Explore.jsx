import React from 'react'

import { makeStyles } from '@material-ui/core/styles'
import { Container, Typography, Grid } from '@material-ui/core'
import Loader from './components/Loader'

import { TrendingUp, Whatshot, Replay } from '@material-ui/icons'

import PosterSlides from './components/PosterSlides'

const useStyles = makeStyles((theme) => ({
  root: {},
  header: {
    display: 'flex',
    alignItems: 'center',
  },
}))

const Explore = ({ trending, config, topRated, upComing, isLoading }) => {
  const classes = useStyles()
  if (isLoading) {
    return <Loader />
  }
  return (
    <Container>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Typography variant='h6'>
            Trending
            <TrendingUp color='secondary' fontSize='inherit' />
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <PosterSlides
            movieData={trending}
            config={config}
            hasDelete={false}
          />
        </Grid>
        <Grid item xs={12}>
          <Typography
            align='left'
            variant='h6'
            gutterBottom={true}
            className={classes.header}
          >
            Top Rated
            <Whatshot color='secondary' fontSize='inherit' />
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <PosterSlides
            movieData={topRated}
            config={config}
            hasDelete={false}
          />
        </Grid>
        <Grid item xs={12}>
          <Typography
            align='left'
            variant='h6'
            gutterBottom={true}
            className={classes.header}
          >
            Up and Coming
            <Replay color='secondary' fontSize='inherit' />
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <PosterSlides
            movieData={upComing}
            config={config}
            hasDelete={false}
          />
        </Grid>
      </Grid>
    </Container>
  )
}

export default Explore
