import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

import { CircularProgress } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > * + *': {
      marginLeft: theme.spacing(2),
    },
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100vh',
  },
}))

const Loader = ({ size }) => {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <CircularProgress size={size} color='secondary' />
    </div>
  )
}

export default Loader
