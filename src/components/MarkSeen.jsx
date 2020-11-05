import React from 'react'

import { Button } from '@material-ui/core'
import { DoneOutlineRounded } from '@material-ui/icons'

const MarkSeen = ({ hasSeen, seen, onClick, listId, id }) => {
  if (!hasSeen) {
    return null
  }
  if (seen) {
    return (
      <>
        <DoneOutlineRounded
          color='secondary'
          onClick={() => onClick(listId, id)}
        />
      </>
    )
  }

  return (
    <>
      <Button
        color='secondary'
        variant='outlined'
        size='small'
        onClick={() => onClick(listId, id)}
      >
        Mark seen
      </Button>
    </>
  )
}

export default MarkSeen
