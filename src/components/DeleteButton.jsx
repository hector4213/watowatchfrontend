import React from 'react'

import { IconButton } from '@material-ui/core'

import { RemoveCircle } from '@material-ui/icons'

const DeleteButton = ({ onClick, hasDelete }) => {
  if (!hasDelete) {
    return null
  }
  return (
    <IconButton onClick={onClick}>
      <RemoveCircle />
    </IconButton>
  )
}

export default DeleteButton
