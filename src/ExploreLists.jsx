import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import {
  Container,
  Grid,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core'
import { ListAltRounded } from '@material-ui/icons'

import userService from './apis/userService'

const ExploreLists = () => {
  const [users, setUsers] = useState([])

  const fetchUserData = async () => {
    const response = await userService.getAllUsers()
    setUsers(response)
  }

  useEffect(() => {
    fetchUserData()
  }, [])

  return (
    <Container component='main'>
      <Paper>
        <Grid container spacing={3} justify='center'>
          <Grid item xs={12}>
            <Typography component='h1' variant='h4'>
              Check out other users collections
            </Typography>
          </Grid>

          {users.map((user) => (
            <>
              <Grid item xs={12} md={6}>
                <Typography
                  variant='overline'
                  component={Link}
                  to={`/explore/profile/${user.id}`}
                >{`${user.first_name}'s Lists`}</Typography>
              </Grid>
              <Grid container item xs={12} md={6} spacing={2}>
                <List>
                  {user.movelists.map((list) => (
                    <ListItem>
                      <ListItemIcon>
                        <ListAltRounded />
                      </ListItemIcon>
                      <ListItemText primary={list.title} />
                    </ListItem>
                  ))}
                </List>
              </Grid>
            </>
          ))}
        </Grid>
      </Paper>
    </Container>
  )
}

export default ExploreLists
