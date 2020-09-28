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
  const [config, setConfig] = useState(null)

  useEffect(() => {
    const fetchMovies = async () => {
      const configResponse = await tvdbService.getImgConfig()
      const response = await tvdbService.getTrending()
      setConfig(configResponse.images)
      setTrending(response.results)
      console.log(configResponse.images)
    }
    fetchMovies()
  }, [])
  console.log(trending)
  const classes = useStyles()

  if (!config || !trending) {
    return null
  }
  return (
    <Container>
      <Typography align='left' variant='h2'>
        Trending
      </Typography>
      <div className={classes.sliderContainer}>
        {trending && config ? (
          <PosterGrid movieData={trending} config={config} />
        ) : null}
      </div>
    </Container>
  )
}

export default Explore
