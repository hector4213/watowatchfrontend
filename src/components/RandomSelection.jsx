import React from 'react'

import LoadWinner from './LoadWinner'
import { Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core'

import PosterSlides from './PosterSlides'

const useStyles = makeStyles({
  header: {
    display: 'flex',
    justifyContent: 'center',
    padding: 5,
  },
})

const RandomSelection = ({ basket, config, isBasket, handleBasketDelete }) => {
  const classes = useStyles()

  if (basket.length === 0) {
    return (
      <div className={classes.header}>
        <Typography variant='h6'>You havent added any movies yet...</Typography>
      </div>
    )
  }
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
