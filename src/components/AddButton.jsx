import React from 'react'
import { IconButton } from '@material-ui/core'
import { AddCircle } from '@material-ui/icons'

const AddButton = ({ hasAdd, onClick }) => {
  if (!hasAdd) {
    return null
  }
  return (
    <IconButton onClick={onClick}>
      <AddCircle color='secondary' />
    </IconButton>
  )
}

export default AddButton
