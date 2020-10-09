import React, { useState, useEffect } from 'react'

import { Typography, Container, Grid } from '@material-ui/core'

import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles({
  root: {},
})

const MyLists = ({ user, getUserLists }) => {
  const [myLists, setMyLists] = useState([])

  const fetchData = async () => {
    const response = await getUserLists(user.id)
    setMyLists(response)
  }

  useEffect(() => {
    fetchData()
  }, [])
  return (
    <Container>
      <Grid container spacing={3}>
        <Grid item xs={12} md={12}>
          <Typography>{`${user.name} Lists`}</Typography>
        </Grid>
      </Grid>
    </Container>
  )
}

export default MyLists
