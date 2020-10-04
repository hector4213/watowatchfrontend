import React, { useState } from 'react'
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Snackbar,
  Grid,
} from '@material-ui/core'

import { Alert } from '@material-ui/lab'

import userService from '../apis/userService'

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

  const handleSnackOpen = (msg) => {
    setMessage(msg)
    setSnackOpen(true)
    setTimeout(() => {
      setOpen(false)
    }, 2000)
  }

  const handleClose = () => {
    setOpen(false)
  }
  const clearFields = () => {
    setFirstName('')
    setLastName('')
    setPassword('')
    setEmail('')
    setPasswordConfirm('')
  }
  const handleRegister = async (e) => {
    e.preventDefault()
    if (password !== passwordConfirm) {
      handleSnackOpen('Password do not match, please try again')
      clearFields()
      return
    }
    try {
      const newUser = {
        firstName,
        lastName,
        email,
        password,
      }
      await userService.register(newUser)
      setError(false)
      clearFields()
      handleSnackOpen(
        `Thanks ${firstName} please log in with your new account!`
      )
    } catch (error) {
      handleSnackOpen(error.response.data.error)
      setError(true)
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
          <form onSubmit={handleRegister}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  margin='dense'
                  id='firstName'
                  label='First Name *'
                  type='text'
                  fullWidth
                  color='secondary'
                  onChange={({ target }) => setFirstName(target.value)}
                  value={firstName}
                  variant='outlined'
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  margin='dense'
                  id='lastName'
                  label='Last Name *'
                  type='text'
                  fullWidth
                  color='secondary'
                  onChange={({ target }) => setLastName(target.value)}
                  value={lastName}
                  variant='outlined'
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  margin='dense'
                  id='email'
                  label='Email *'
                  type='email'
                  fullWidth
                  color='secondary'
                  onChange={({ target }) => setEmail(target.value)}
                  value={email}
                  variant='outlined'
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  margin='dense'
                  id='password'
                  label='Password *'
                  type='password'
                  fullWidth
                  color='secondary'
                  onChange={({ target }) => setPassword(target.value)}
                  value={password}
                  variant='outlined'
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  margin='dense'
                  id='passwordConfirm'
                  label='Confirm Password *'
                  type='password'
                  fullWidth
                  color='secondary'
                  onChange={({ target }) => setPasswordConfirm(target.value)}
                  value={passwordConfirm}
                  variant='outlined'
                />
              </Grid>
            </Grid>
            <DialogActions>
              <Button variant='contained' type='submit' color='secondary'>
                Register
              </Button>
              <Button
                variant='contained'
                onClick={handleClose}
                color='secondary'
              >
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
