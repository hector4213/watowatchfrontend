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
  Snackbar,
} from '@material-ui/core'
import { FormatListBulleted } from '@material-ui/icons'
import { Alert } from '@material-ui/lab'

import listService from './apis/listService'

const useStyles = makeStyles((theme) => ({
  paper: {
    minHeight: '300px',
  },
  listInfo: {
    width: '100%',
    maxWidth: 360,
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

  if (!user) {
    return 'please log in to make lists'
  }

  return (
    <Container component='main'>
      <Paper>
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
            <Grid item xs={5}>
              <form onSubmit={handleSubmit}>
                <TextField
                  id='title'
                  label='enter title'
                  variant='outlined'
                  value={name}
                  onChange={({ target }) => setName(target.value)}
                />
              </form>
            </Grid>
            <Grid item xs={3}>
              <Button
                color='secondary'
                size='large'
                variant='contained'
                type='submit'
              >
                Create
              </Button>
            </Grid>
          </Grid>

          <Grid container item xs={12}>
            <Grid item xs={6}>
              <List subheader={<ListSubheader>Info</ListSubheader>}>
                <ListItem>
                  <ListItemIcon>
                    <FormatListBulleted />
                  </ListItemIcon>
                  <ListItemText
                    primary={`You have ${userLists.length} lists`}
                  ></ListItemText>
                </ListItem>
              </List>
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
