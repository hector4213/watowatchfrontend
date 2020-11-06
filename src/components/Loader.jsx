import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

import { CircularProgress } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > * + *': {
      marginLeft: theme.spacing(2),
    },
    justify: 'space-between',
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
