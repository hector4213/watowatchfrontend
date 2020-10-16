import React, { useState, useEffect } from 'react'

import { Container, Grid, Typography, Button, Paper } from '@material-ui/core'

import userService from './apis/userService'

const ExploreLists = () => {
  const [users, setUsers] = useState([])
  const [selectedUser, setSelectedUser] = useState(null)

  const fetchUserData = async () => {
    const response = await userService.getAllUsers()
    setUsers(response)
    console.log(response)
  }

  useEffect(() => {
    fetchUserData()
  }, [])

  const getUserListData = async (id) => {
    const response = await userService.getUserLists(id)
    setSelectedUser(response)
  }

  if (selectedUser) {
  }

  return (
    <Container component='main'>
      <Typography component='h1' variant='h4'>
        Check out other lists users have collected
      </Typography>

      {users.map((user) => (
        <div>
          <h3
            onClick={() => getUserListData(user.id)}
          >{`${user.first_name}'s Lists`}</h3>
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
