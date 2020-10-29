import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import { Container, Grid, Typography, Chip } from '@material-ui/core'
import { Theaters } from '@material-ui/icons'

import userService from './apis/userService'

const ExploreLists = () => {
  const [users, setUsers] = useState([])

  const fetchUserData = async () => {
    const response = await userService.getAllUsers()
    setUsers(response)
    console.log(response)
  }

  useEffect(() => {
    fetchUserData()
  }, [])

  return (
    <Container component='main'>
      <Typography component='h1' variant='h4'>
        Check out other users collections
      </Typography>

      <Grid container spacing={3}>
        {users.map((user) => (
          <>
            <Grid item xs={12} md={6}>
              <Typography
                component={Link}
                to={`/explore/profile/${user.id}`}
              >{`${user.first_name}'s Lists`}</Typography>
            </Grid>
            <Grid container item xs={12} md={6} spacing={2}>
              {user.movelists.map((list) =>
                list === null ? (
                  'User has no lists'
                ) : (
                  <Grid item xs={12}>
                    <Chip
                      color='secondary'
                      icon={<Theaters />}
                      label={list.title}
                    />
                  </Grid>
                )
              )}
            </Grid>
          </>
        ))}
      </Grid>
    </Container>
  )
}

export default ExploreLists
