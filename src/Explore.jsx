import React from 'react'

import { makeStyles } from '@material-ui/core/styles'
import { Container, Typography, Grid } from '@material-ui/core'
import Loader from './components/Loader'

import { TrendingUp, Whatshot, Replay } from '@material-ui/icons'

import PosterSlides from './components/PosterSlides'
import ExploreGrid from './components/ExploreGrid'

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
      <ExploreGrid
        config={config}
        trending={trending}
        topRated={topRated}
        upComing={upComing}
      />
    </Container>
  )
}

export default Explore
