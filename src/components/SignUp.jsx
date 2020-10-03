import React, { useState } from 'react'
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Snackbar,
} from '@material-ui/core'

import { Alert } from '@material-ui/lab'

const SignUp = () => {
  const [open, setOpen] = useState(false)
  const [snackOpen, setSnackOpen] = useState(false)
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const [error, setError] = useState(false)
  const [message, setMessage] = useState('')

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleSnackClose = () => {
    setSnackOpen(false)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleLogin = (e) => {
    e.preventDefault()
    if (password !== passwordConfirm) {
      setError(true)
      setMessage('Passwords do not match')
    }
    try {
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div>
      <Button color='secondary' onClick={handleClickOpen}>
        SIGN UP
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='form-dialog-title'
      >
        <DialogTitle id='form-dialog-title'>Register</DialogTitle>
        <DialogContent>
          <form onSubmit={handleLogin}>
            <TextField
              margin='dense'
              id='firstName'
              label='firstname'
              type='text'
              fullWidth
              color='secondary'
              onChange={({ target }) => setFirstName(target.value)}
              value={firstName}
            />{' '}
            <TextField
              margin='dense'
              id='lastName'
              label='lastName'
              type='text'
              fullWidth
              color='secondary'
              onChange={({ target }) => setLastName(target.value)}
              value={lastName}
            />
            <TextField
              margin='dense'
              id='email'
              label='email'
              type='email'
              fullWidth
              color='secondary'
              onChange={({ target }) => setEmail(target.value)}
              value={email}
            />
            <TextField
              margin='dense'
              id='password'
              label='password'
              type='password'
              fullWidth
              color='secondary'
              onChange={({ target }) => setPassword(target.value)}
              value={password}
            />
            <TextField
              margin='dense'
              id='passwordConfirm'
              label='password'
              type='password'
              fullWidth
              color='secondary'
              onChange={({ target }) => setPasswordConfirm(target.value)}
              value={passwordConfirm}
            />
            <DialogActions>
              <Button type='submit' color='inherit'>
                Register
              </Button>
              <Button onClick={handleClose} color='inherit'>
                Cancel
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
        <Snackbar
          open={snackOpen}
          autoHideDuration={2000}
          onClose={handleSnackClose}
        >
          <Alert severity={error ? 'error' : 'success'}>{message}</Alert>
        </Snackbar>
      </Dialog>
    </div>
  )
}

export default SignUp
