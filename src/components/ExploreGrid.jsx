import React from 'react'

import { Grid, Typography } from '@material-ui/core'
import PosterSlides from './PosterSlides'
import { TrendingUp, Replay, Whatshot } from '@material-ui/icons'

const ExploreGrid = ({ trending, topRated, upComing, config }) => {
  return (
    <Grid container spacing={4}>
      <Grid item xs={12}>
        <Typography variant='h6'>
          Trending
          <TrendingUp color='secondary' fontSize='inherit' />
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <PosterSlides movieData={trending} config={config} hasDelete={false} />
      </Grid>
      <Grid item xs={12}>
        <Typography align='left' variant='h6' gutterBottom>
          Top Rated
          <Whatshot color='secondary' fontSize='inherit' />
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <PosterSlides movieData={topRated} config={config} hasDelete={false} />
      </Grid>
      <Grid item xs={12}>
        <Typography align='left' variant='h6' gutterBottom>
          Up and Coming
          <Replay color='secondary' fontSize='inherit' />
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <PosterSlides movieData={upComing} config={config} hasDelete={false} />
      </Grid>
    </Grid>
  )
}

export default ExploreGrid
