import React from 'react'

import { Grid, Paper, Typography } from '@material-ui/core'

import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
  header: {
    marginTop: '75px',
  },
  gridStyles: {
    marginTop: '50px',
  },
})

const Header = () => {
  const classes = useStyles()
  return (
    <Grid className={classes.gridStyles} container spacing={3}>
      <Grid
        item
        xs={12}
        spacing={3}
        alignItems='center'
        justify='space-between'
        container
      >
        <Grid item xs={8}>
          <Paper>
            <Typography variant='h2'>Explore</Typography>
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper>
            <Typography variant='body1'>Logout</Typography>
          </Paper>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default Header
