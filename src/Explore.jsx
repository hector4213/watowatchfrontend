import React from 'react'

import { makeStyles } from '@material-ui/core/styles'

import { Container } from '@material-ui/core'
import { Typography } from '@material-ui/core'

const useStyles = makeStyles({
  header: {
    marginTop: '75px',
    color: 'indigo',
  },
})

const Explore = () => {
  const classes = useStyles()
  return (
    <Container>
      <Typography className={classes.header} variant='h2' align='left'>
        Explore{' '}
      </Typography>
    </Container>
  )
}

export default Explore
