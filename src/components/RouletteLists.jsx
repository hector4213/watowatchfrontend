import React from 'react'
import { Typography, Container } from '@material-ui/core'
import PosterSlides from './PosterSlides'

const RouletteLists = ({ selectedList, handleAddToBasket, config }) => {
  if (!selectedList) {
    return (
      <Typography variant='body1' align='left'>
        Start by choosing your from your lists
      </Typography>
    )
  }
  return (
    <Container component='section' style={{ paddingTop: '50px' }}>
      <Typography component='h1' variant='h4' align='center'>
        {selectedList.title}
      </Typography>
      <PosterSlides
        movieData={selectedList.movies}
        config={config}
        handleBasketAdd={handleAddToBasket}
        hasBasket={true}
      />
    </Container>
  )
}

export default RouletteLists
