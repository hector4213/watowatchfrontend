import React from 'react'
import { TextField, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
  container: {
    display: 'flex',
    width: '100%',
    justifyContent: 'space-around',
  },
})

const CreateForm = ({ setTitle, handleSubmit, title }) => {
  const classes = useStyles()
  return (
    <div className={classes.container}>
      <form id='title' onSubmit={handleSubmit}>
        <TextField
          id='title'
          label='Enter title'
          variant='outlined'
          value={title}
          onChange={({ target }) => setTitle(target.value)}
          fullWidth
        />
      </form>
      <Button
        color='secondary'
        size='large'
        variant='contained'
        type='submit'
        form='title'
        onSubmit={() => handleSubmit()}
      >
        Create
      </Button>
    </div>
  )
}

export default CreateForm
