import React from 'react'

import { makeStyles } from '@material-ui/core/styles'

import { Typography } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  header: {
    marginTop: '75px',
    color: 'indigo',
  },
}))

const Explore = () => {
  const classes = useStyles()
  return (
    <main className={classes.root}>
      <Typography variant='h1' align='left'>
        Explore{' '}
      </Typography>
    </main>
  )
}

export default Explore
