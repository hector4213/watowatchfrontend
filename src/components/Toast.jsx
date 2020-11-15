import React from 'react'
import { Alert } from '@material-ui/lab'
import { Snackbar } from '@material-ui/core'

const Toast = ({ open, onClose, message, error }) => {
  return (
    <Snackbar open={open} autoHideDuration={2000} onClose={onClose}>
      <Alert severity={error ? 'error' : 'success'}>{message}</Alert>
    </Snackbar>
  )
}

export default Toast
