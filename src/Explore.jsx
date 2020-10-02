import React from 'react'

import { makeStyles } from '@material-ui/core/styles'
import { Container, Typography } from '@material-ui/core'

import { TrendingUp, Whatshot, Replay } from '@material-ui/icons'

import PosterSlides from './components/PosterSlides'

const useStyles = makeStyles((theme) => ({
  root: {},
  header: {
    display: 'flex',
    alignItems: 'center',
  },
}))

const Explore = ({
  trending,
  config,
  topRated,
  upComing,
  isLoading,
  history,
}) => {
  console.log(trending)
  const classes = useStyles()

  if (isLoading) {
    return null
  }
  return (
    <Container>
      <div>
        <Typography
          align='left'
          variant='h3'
          gutterBottom={true}
          className={classes.header}
        >
          Trending
          <TrendingUp color='secondary' fontSize='inherit' />
        </Typography>
      </div>
      <div className={classes.sliderContainer}>
        <PosterSlides movieData={trending} config={config} />
        <Typography
          align='left'
          variant='h3'
          gutterBottom={true}
          className={classes.header}
        >
          Top Rated
          <Whatshot color='secondary' fontSize='inherit' />
        </Typography>
        <PosterSlides movieData={topRated} config={config} />
        <Typography
          align='left'
          variant='h3'
          gutterBottom={true}
          className={classes.header}
        >
          Up and Coming
          <Replay color='secondary' fontSize='inherit' />
        </Typography>
        <PosterSlides movieData={upComing} config={config} />
      </div>
    </Container>
  )
}

export default Explore
