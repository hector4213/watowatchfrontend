import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import { Container, Grid, Typography, Button, Paper } from '@material-ui/core'

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
        Check out other lists users have collected
      </Typography>

      {users.map((user) => (
        <div>
          <Typography
            component={Link}
            to={`/explore/profile/${user.id}`}
          >{`${user.first_name}'s Lists`}</Typography>
          <p>
            {user.movelists.map((list) => {
              if (list === null) {
                return 'empty'
              } else {
                return <li>{list.title}</li>
              }
            })}
          </p>
        </div>
      ))}
    </Container>
  )
}

export default ExploreLists
