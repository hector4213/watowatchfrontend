import React from 'react'

import { Typography, Container, Grid } from '@material-ui/core'

import { makeStyles } from '@material-ui/styles'

import PosterSlides from './components/PosterSlides'

const useStyles = makeStyles({
  root: {},
})

const MyLists = ({ user, userLists, config }) => {
  console.log(userLists)
  return (
    <Container>
      <Grid container spacing={3}>
        <Grid item xs={12} md={12}>
          <Typography>{`${user.name} Lists`}</Typography>
        </Grid>
        <Grid item xs={12}>
          {userLists.map((list) => (
            <div>
              {list.title}
              <PosterSlides movieData={list.movies} config={config} />
            </div>
          ))}
        </Grid>
      </Grid>
    </Container>
  )
}

export default MyLists
