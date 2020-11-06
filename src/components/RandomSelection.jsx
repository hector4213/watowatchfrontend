import React from 'react'

import LoadWinner from './LoadWinner'

import PosterSlides from './PosterSlides'

const RandomSelection = ({ basket, config, isBasket, handleBasketDelete }) => {
  if (basket.length === 1 && basket.some((movie) => movie.winner)) {
    return <LoadWinner winner={[...basket]} config={config} />
  }
  return (
    <PosterSlides
      movieData={basket}
      config={config}
      isBasket={isBasket}
      handleBasketDelete={handleBasketDelete}
    />
  )
}

export default RandomSelection
