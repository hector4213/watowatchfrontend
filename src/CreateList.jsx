import React, { useState, useEffect } from 'react'

import CreateListInfo from './components/CreateListInfo'
import CreateForm from './components/CreateForm'
import Toast from './components/Toast'

import { makeStyles } from '@material-ui/core/styles'
import { Grid, Typography, Paper, Container } from '@material-ui/core'

import listService from './apis/listService'

const useStyles = makeStyles((theme) => ({
  paper: {
    minHeight: '85vh',
  },
  listInfo: {
    backgroundColor: theme.palette.background.paper,
  },
}))
const CreateList = ({ user, getUserLists }) => {
  const [name, setName] = useState('')
  const [message, setMessage] = useState('null')
  const [open, setOpen] = useState(false)
  const [error, setError] = useState(false)
  const [userLists, setUserLists] = useState([])

  const classes = useStyles()
  useEffect(() => {
    fetchData()
  }, [user])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const listTitle = {
        title: name,
      }
      await listService.createList(listTitle)
      setOpen(true)
      setMessage('List Created!')
      setName('')
    } catch (error) {
      setOpen(true)
      setMessage(error.response.data.error)
      setError(true)
      setTimeout(() => {
        setError(false)
      }, 2000)
    }
  }

  const handleSnackClose = () => {
    setOpen(false)
  }

  const fetchData = async () => {
    const response = await getUserLists(user.id)
    setUserLists(response)
  }
  const totalMovies = userLists
    .map((list) => list.movies.length)
    .reduce((total, curr) => total + curr, 0)

  const totalBuddies = userLists
    .map((list) => [...list.buddy_ids])
    .reduce((a, b) => a.concat(b), [])

  const uniqueBuddies = Array.from(new Set(totalBuddies.map((b) => b.f2))).map(
    (f2) => {
      return {
        f2: f2,
        f1: totalBuddies.find((b) => b.f2 === f2).f1,
      }
    }
  )

  if (!user) {
    return 'please log in to make lists'
  }

  return (
    <Container component='main'>
      <Paper className={classes.paper}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography className={classes.header} variant='h6' align='center'>
              Create a new movie list
            </Typography>
          </Grid>
          <Grid
            container
            item
            xs={12}
            justify='space-around'
            alignItems='center'
          >
            <Grid item xs={12} md={12}>
              <CreateForm
                setTitle={setName}
                handleSubmit={handleSubmit}
                title={name}
              />
            </Grid>
          </Grid>
          <Grid
            container
            item
            spacing={8}
            direction='column'
            alignItems='center'
            xs={12}
            md={12}
          >
            <Grid item xs={12} />
            <Grid item xs={12} md={12}>
              <CreateListInfo
                numLists={userLists.length}
                numMovies={totalMovies}
                numBuddies={uniqueBuddies.length}
              />
            </Grid>
          </Grid>
        </Grid>
        <Toast
          open={open}
          onClose={handleSnackClose}
          message={message}
          error={error}
        />
      </Paper>
    </Container>
  )
}

export default CreateList
