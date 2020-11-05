import React from 'react'

import { IconButton } from '@material-ui/core'

import { Eject } from '@material-ui/icons'

const BasketDelete = ({ onClick, isBasket, id }) => {
  if (!isBasket) {
    return null
  }
  return (
    <IconButton onClick={() => onClick(id)}>
      <Eject color='secondary' />
    </IconButton>
  )
}

export default BasketDelete
