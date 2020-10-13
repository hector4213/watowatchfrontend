import React, { useState, useEffect } from 'react'

import {
  InputBase,
  MenuList,
  MenuItem,
  Fade,
  Popper,
  Paper,
  ClickAwayListener,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'

import { Link } from 'react-router-dom'

import tvdbService from '../apis/tvdbService'

const useStyles = makeStyles({
  root: {
    display: 'flex',
  },
})

const SearchBar = () => {
  const [text, setText] = useState('')
  const [results, setResults] = useState([])
  const [anchorEl, setAnchorEl] = useState(null)
  const [isOpen, setIsOpen] = useState(false)
  const divRef = React.useRef()
  const classes = useStyles()
  //TODO: fix search results, fix focus issue, placement, add small image + movie yr
  useEffect(() => {
    const search = async () => {
      const response = await tvdbService.searchMovies(text)

      setResults(response)
    }
    const timeoutId = setTimeout(() => {
      if (text) {
        setIsOpen(true)
        search()
      }
    }, 1000)
    return () => {
      clearTimeout(timeoutId)
    }
  }, [text])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await tvdbService.searchMovies(text)
      console.log(response)
    } catch (error) {
      console.log(error)
    }
  }

  const handleChange = (e) => {
    setAnchorEl(divRef.current)
    setText(e.target.value)
  }

  const handleClose = (e) => {
    setIsOpen(false)
    setAnchorEl(null)
  }
  const showResults = (
    <MenuList autoFocusItem={isOpen} id='menu-list-grow'>
      {results.map((movie) => (
        <MenuItem key={movie.id} component={Link} to={`/movies/${movie.id}`}>
          {movie.original_title}
        </MenuItem>
      ))}
    </MenuList>
  )

  return (
    <div className={classes.searchContainer}>
      <form onSubmit={handleSubmit}>
        <InputBase
          placeholder='Search movies...'
          onChange={handleChange}
          value={text}
        />
      </form>
      <div ref={divRef}></div>
      <Popper
        open={isOpen}
        anchorEl={divRef.current}
        role={undefined}
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Fade
            {...TransitionProps}
            style={{
              transformOrigin: 'center top',
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                {showResults}
              </ClickAwayListener>
            </Paper>
          </Fade>
        )}
      </Popper>
    </div>
  )
}

export default SearchBar
