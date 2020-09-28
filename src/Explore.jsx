import React, { useState, useEffect } from 'react'

import { makeStyles } from '@material-ui/core/styles'
import { Container, Typography } from '@material-ui/core'

import PosterGrid from './components/PosterGrid'

import tvdbService from './apis/tvdbService'

const useStyles = makeStyles((theme) => ({
  root: {},
  sliderContainer: {},
}))

const Explore = () => {
  const [trending, setTrending] = useState([])
  const [config, setConfig] = useState([])
  const [topRated, setTopRated] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchMovies = async () => {
      await Promise.all([
        tvdbService.getImgConfig(),
        tvdbService.getTrending(),
        tvdbService.getTopRated(),
      ]).then((responses) => {
        setConfig(responses[0].images)
        setTrending(responses[1].results)
        setTopRated(responses[2].results)
        setIsLoading(false)
      })
    }

    fetchMovies()
  }, [])
  console.log(trending)
  const classes = useStyles()

  if (isLoading) {
    return null
  }
  return (
    <Container>
      <Typography align='left' variant='h3' gutterBottom={true}>
        Trending
      </Typography>
      <div className={classes.sliderContainer}>
        <PosterGrid movieData={trending} config={config} />
        <Typography align='left' variant='h3' gutterBottom={true}>
          Top Rated
        </Typography>
        <PosterGrid movieData={topRated} config={config} />
      </div>
    </Container>
  )
}

export default Explore
