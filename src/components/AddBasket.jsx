import React from 'react'
import { IconButton } from '@material-ui/core'
import { ShoppingBasket } from '@material-ui/icons'

const AddBasket = ({ hasBasket, movieSelection, onClick }) => {
  if (!hasBasket) {
    return null
  }
  return (
    <IconButton onClick={() => onClick(movieSelection)}>
      <ShoppingBasket color='secondary' />
    </IconButton>
  )
}

export default AddBasket
