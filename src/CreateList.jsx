import React, { useState, useEffect } from 'react'

import { makeStyles } from '@material-ui/core/styles'
import {
  Grid,
  Typography,
  Paper,
  Container,
  TextField,
  Button,
  List,
  ListItemText,
  ListItemIcon,
  ListItem,
  ListSubheader,
  Divider,
  Box,
  Snackbar,
} from '@material-ui/core'
import { FormatListBulleted, Theaters, EmojiPeople } from '@material-ui/icons'
import { Alert } from '@material-ui/lab'

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
  const [error, setError] = useState(null)
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
      setTimeout(() => {
        setOpen(false)
      }, 2000)
    } catch (error) {
      setMessage(error.response.data.msg)
    }
  }

  const fetchData = async () => {
    const response = await getUserLists(user.id)
    setUserLists(response)
  }
  const totalMovies = userLists
    .map((list) => list.movies.length)
    .reduce((total, curr) => {
      return total + curr
    }, 0)

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
  console.log(totalBuddies, uniqueBuddies)

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
            <Grid item xs={12} md={5}>
              <form onSubmit={handleSubmit}>
                <TextField
                  id='title'
                  label='Enter title'
                  variant='outlined'
                  value={name}
                  onChange={({ target }) => setName(target.value)}
                  fullWidth
                />
              </form>
            </Grid>
            <Grid item xs={12} md={2}>
              <Button
                color='secondary'
                size='large'
                variant='contained'
                type='submit'
                onSubmit={handleSubmit}
              >
                Create
              </Button>
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
              <Box elevation={3}>
                <List
                  className={classes.listInfo}
                  subheader={<ListSubheader>Info</ListSubheader>}
                >
                  <ListItem>
                    <ListItemIcon>
                      <FormatListBulleted />
                    </ListItemIcon>
                    <ListItemText
                      primary={`You have ${userLists.length} lists`}
                    ></ListItemText>
                  </ListItem>
                  <Divider variant='inset' component='li' />
                  <ListItem>
                    <ListItemIcon>
                      <Theaters />
                    </ListItemIcon>
                    <ListItemText
                      primary={`That total ${totalMovies} movies`}
                    ></ListItemText>
                  </ListItem>
                  <Divider variant='inset' component='li' />
                  <ListItem>
                    <ListItemIcon>
                      <EmojiPeople />
                    </ListItemIcon>
                    <ListItemText
                      primary={`With ${uniqueBuddies.length} unique buddies`}
                    ></ListItemText>
                  </ListItem>
                  <Divider variant='inset' component='li' />
                </List>
              </Box>
            </Grid>
          </Grid>
        </Grid>

        <Snackbar open={open} autoHideDuration={2000}>
          <Alert severity={error ? 'error' : 'success'}>{message}</Alert>
        </Snackbar>
      </Paper>
    </Container>
  )
}

export default CreateList
