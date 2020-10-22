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
import { makeStyles, fade } from '@material-ui/core/styles'

import { Link } from 'react-router-dom'
import MovieFilterOutlinedIcon from '@material-ui/icons/MovieFilterOutlined'

import tvdbService from '../apis/tvdbService'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchContainer: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}))

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
        <div className={classes.searchIcon}>
          <MovieFilterOutlinedIcon />
        </div>
        <InputBase
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
          }}
          inputProps={{ 'aria-label': 'search' }}
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
