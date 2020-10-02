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

import loginService from '../apis/loginService'
import listService from '../apis/listService'

const LoginModal = ({ setUser }) => {
  const [open, setOpen] = useState(false)
  const [password, setPassword] = useState(null)
  const [email, setEmail] = useState(null)
  const [snackOpen, setSnackOpen] = useState(false)
  const [message, setMessage] = useState(null)
  const [error, setError] = useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleSnackOpen = (msg) => {
    setMessage(msg)
    setSnackOpen(true)
    setTimeout(() => {
      setOpen(false)
    }, 3000)
  }

  const handleSnackClose = () => {
    setSnackOpen(false)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const user = await loginService.login({
        email,
        password,
      })
      window.localStorage.setItem('loggedInUser', JSON.stringify(user))

      listService.setToken(user.token)
      setUser(user)
      setError(false)
      handleSnackOpen('Logged in')
    } catch (error) {
      handleSnackOpen(error.response.data.msg)
      setError(true)
    }
  }

  return (
    <div>
      <Button color='secondary' onClick={handleClickOpen}>
        LOGIN
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='form-dialog-title'
      >
        <DialogTitle id='form-dialog-title'>Login</DialogTitle>
        <DialogContent>
          <form onSubmit={handleLogin}>
            <TextField
              margin='dense'
              id='name'
              label='Email Address'
              type='email'
              fullWidth
              color='secondary'
              onChange={(e) => setEmail(e.target.value)}
            />{' '}
            <TextField
              margin='dense'
              id='password'
              label='Password'
              type='password'
              fullWidth
              color='secondary'
              onChange={(e) => setPassword(e.target.value)}
            />
            <DialogActions>
              <Button type='submit' color='inherit'>
                Login
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

export default LoginModal
