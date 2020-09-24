import React from 'react'

import { Grid } from '@material-ui/core'

import { makeStyles } from '@material-ui/core/styles'

import MovieCard from '../components/MovieCard'

const PosterGrid = ({ movieData, config }) => {
  console.log('this is from poster grid', config.poster_sizes[0])
  return (
    <Grid container spacing={2} justify='space-evenly'>
      {movieData.map((movie) => (
        <Grid item key={movie.id}>
          <MovieCard
            title={movie.title}
            overview={movie.overview}
            imageTitle={movie.title}
            src={config.base_url + config.poster_sizes[3] + movie.poster_path}
            year={movie.release_date.substring(0, 4)}
          />
        </Grid>
      ))}
    </Grid>
  )
}

export default PosterGrid
