import React from 'react'
// import { CircularProgress } from '@material-ui/core/CircularProgress'
import CircularProgress from '@material-ui/core/CircularProgress'
import { Typography, Box } from '@material-ui/core'
const UserRating = ({ value }) => {
  return (
    <Box position='relative' display='inline-flex'>
      <CircularProgress color='secondary' variant='static' value={value} />
      <Box
        top={0}
        left={0}
        bottom={0}
        right={0}
        position='absolute'
        display='flex'
        alignItems='center'
        justifyContent='center'
      >
        <Typography
          variant='caption'
          component='div'
          color='textSecondary'
        >{`${value}%`}</Typography>
      </Box>
    </Box>
  )
}
export default UserRating
