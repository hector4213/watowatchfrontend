import React from 'react'

import { makeStyles } from '@material-ui/core/styles'
import { Container, Typography } from '@material-ui/core'
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
  console.log(trending)
  const classes = useStyles()

  if (isLoading) {
    return <Loader />
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
        <PosterSlides movieData={trending} config={config} hasDelete={false} />
        <Typography
          align='left'
          variant='h3'
          gutterBottom={true}
          className={classes.header}
        >
          Top Rated
          <Whatshot color='secondary' fontSize='inherit' />
        </Typography>
        <PosterSlides movieData={topRated} config={config} hasDelete={false} />
        <Typography
          align='left'
          variant='h3'
          gutterBottom={true}
          className={classes.header}
        >
          Up and Coming
          <Replay color='secondary' fontSize='inherit' />
        </Typography>
        <PosterSlides movieData={upComing} config={config} hasDelete={false} />
      </div>
    </Container>
  )
}

export default Explore
