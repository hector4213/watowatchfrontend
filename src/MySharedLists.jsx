import React, { useState, useEffect } from 'react'

import { Container, Typography } from '@material-ui/core'

const MySharedLists = () => {
  const [buddyLists, setBuddyLists] = useState([])

  useEffect(() => {})
  return (
    <Container>
      <Typography component='h1' variant='h3'>
        Buddied User Lists
      </Typography>
    </Container>
  )
}

export default MySharedLists
