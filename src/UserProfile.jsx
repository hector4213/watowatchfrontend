import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { Container, Typography, Button, Grid } from '@material-ui/core'
import PosterSlides from './components/PosterSlides'

import userService from './apis/userService'

const UserProfile = ({ config, getUserLists }) => {
  const [user, setUser] = useState(null)
  const [lists, setLists] = useState([])
  const [loading, setIsLoading] = useState(true)
  const userProfile = useParams().id

  const fetchUserData = async () => {
    const userData = await userService.getProfile(userProfile)
    const listData = await getUserLists(userProfile)
    const responses = await Promise.all([userData, listData])
    setUser(responses[0])
    setLists(responses[1])
    setIsLoading(false)
  }

  useEffect(() => {
    fetchUserData()
  }, [])

  if (loading) {
    return 'Loading....'
  }

  return (
    <Container>
      <Typography component='h1' variant='h5'>
        {`${user.first_name}'s Lists`}
      </Typography>
      <Grid conatiner spacing={3}>
        {lists.map((list) => (
          <>
            <Grid item xs={12}>
              {list.title}
            </Grid>
            <Grid item xs={12}>
              <PosterSlides
                hasDelete={false}
                movieData={list.movies}
                config={config}
              />
            </Grid>
          </>
        ))}
      </Grid>
    </Container>
  )
}

export default UserProfile
