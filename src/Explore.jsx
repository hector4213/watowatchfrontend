import React, { useState, useEffect } from 'react'

import { makeStyles } from '@material-ui/core/styles'
import { Container } from '@material-ui/core'

import Header from './components/Header'
import PosterGrid from './components/PosterGrid'

import tvdbService from './apis/tvdbService'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
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
    <Container maxWidth='xl'>
      <Header />
      {trending && config ? (
        <PosterGrid movieData={trending} config={config} />
      ) : null}
    </Container>
  )
}

export default Explore
