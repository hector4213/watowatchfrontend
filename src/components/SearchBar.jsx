import React, { useState, useEffect } from 'react'

import {
  InputBase,
  MenuList,
  MenuItem,
  Fade,
  Popper,
  Paper,
  Grow,
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
  const isOpen = Boolean(anchorEl)
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
    if (divRef.current && divRef.current.contains(e.target)) {
      return
    }
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
        <Popper
          open={isOpen}
          anchorEl={divRef.current}
          role={undefined}
          transition
          disablePortal
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin:
                  placement === 'bottom' ? 'center top' : 'center bottom',
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  {showResults}
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </form>
      <div ref={divRef}></div>
    </div>
  )
}

export default SearchBar
