import React, { useState } from 'react'

import { makeStyles } from '@material-ui/core/styles'
import {
  Grid,
  Typography,
  Paper,
  Container,
  TextField,
  Button,
  Snackbar,
} from '@material-ui/core'
import { Alert } from '@material-ui/lab'

import listService from './apis/listService'

const useStyles = makeStyles((theme) => ({
  paper: {
    minHeight: '300px',
  },
}))
const CreateList = ({ user }) => {
  const [name, setName] = useState('')
  const [message, setMessage] = useState('null')
  const [open, setOpen] = useState(false)
  const [error, setError] = useState(null)

  const classes = useStyles()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const listTitle = {
        title: name,
      }
      const response = await listService.createList(listTitle)
      setOpen(true)
      setMessage('List Created!')
      setName('')
      setTimeout(() => {
        setOpen(false)
      }, 2000)
    } catch (error) {
      setMessage(error.response.data.msg)
    }
  }

  if (!user) {
    return 'please log in to make lists'
  }

  return (
    <Container>
      <Grid container spacing={9}>
        <Grid item xs={12}>
          <Typography variant='h4'>Create a New Movie List</Typography>
        </Grid>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Typography variant='h6'>Enter a title</Typography>
            <form onSubmit={handleSubmit}>
              <TextField
                onChange={({ target }) => setName(target.value)}
                value={name}
                variant='outlined'
                size='small'
                fullWidth
              />
              <Button color='secondary' type='submit' variant='outlined'>
                Create
              </Button>
            </form>
          </Paper>
        </Grid>
      </Grid>
      <Snackbar open={open} autoHideDuration={2000}>
        <Alert severity={error ? 'error' : 'success'}>{message}</Alert>
      </Snackbar>
    </Container>
  )
}

export default CreateList
