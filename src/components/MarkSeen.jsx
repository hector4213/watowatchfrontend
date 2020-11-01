import React from 'react'

import { Button } from '@material-ui/core'
import { DoneOutlineRounded } from '@material-ui/icons'

const MarkSeen = ({ seen, onClick, listId, id }) => {
  if (seen) {
    return (
      <>
        <DoneOutlineRounded onClick={() => onClick(listId, id)} />
      </>
    )
  }

  return (
    <>
      <Button size='small' onClick={() => onClick(listId, id)}>
        Mark as seen
      </Button>
    </>
  )
}

export default MarkSeen
