import React from 'react'

import { Container } from '@material-ui/core/'

import Loader from './components/Loader'

import ExploreGrid from './components/ExploreGrid'

const Explore = ({ trending, config, topRated, upComing, isLoading }) => {
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
