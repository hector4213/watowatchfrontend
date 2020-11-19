import React, { useState, useEffect } from 'react'

import { Container, Grid, Typography, Paper } from '@material-ui/core'

import UserListInfo from './components/UserListInfo'

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
            <Typography component='h1' variant='h6'>
              Check out other users collections
            </Typography>
          </Grid>
          {users.map((user) => (
            <Grid item xs={12} md={6}>
              <UserListInfo user={user} />
            </Grid>
          ))}
        </Grid>
      </Paper>
    </Container>
  )
}

export default ExploreLists
