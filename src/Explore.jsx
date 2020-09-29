import React, { useState, useEffect } from 'react'

import { makeStyles } from '@material-ui/core/styles'
import { Container, Typography } from '@material-ui/core'

import { TrendingUp, Whatshot, Replay } from '@material-ui/icons'

import PosterGrid from './components/PosterGrid'

import tvdbService from './apis/tvdbService'

const useStyles = makeStyles((theme) => ({
  root: {},
  header: {
    display: 'flex',
    alignItems: 'center',
  },
}))

const Explore = ({ history }) => {
  const [trending, setTrending] = useState([])
  const [config, setConfig] = useState([])
  const [topRated, setTopRated] = useState([])
  const [upComing, setUpComing] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const getMovieDetails = (id) => {
    history.push('/movies/' + id)
  }

  useEffect(() => {
    const fetchMovies = async () => {
      await Promise.all([
        tvdbService.getImgConfig(),
        tvdbService.getTrending(),
        tvdbService.getTopRated(),
        tvdbService.getUpAndComing(),
      ]).then((responses) => {
        setConfig(responses[0].images)
        setTrending(responses[1].results)
        setTopRated(responses[2].results)
        setUpComing(responses[3].results)
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
        <PosterGrid
          movieData={trending}
          config={config}
          getDetails={getMovieDetails}
        />
        <Typography
          align='left'
          variant='h3'
          gutterBottom={true}
          className={classes.header}
        >
          Top Rated
          <Whatshot color='secondary' fontSize='inherit' />
        </Typography>
        <PosterGrid
          movieData={topRated}
          config={config}
          getDetails={getMovieDetails}
        />
        <Typography
          align='left'
          variant='h3'
          gutterBottom={true}
          className={classes.header}
        >
          Up and Coming
          <Replay color='secondary' fontSize='inherit' />
        </Typography>
        <PosterGrid
          movieData={upComing}
          config={config}
          getDetails={getMovieDetails}
        />
      </div>
    </Container>
  )
}

export default Explore
