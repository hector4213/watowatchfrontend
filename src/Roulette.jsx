import React, { useState, useEffect } from 'react'

import PosterSlides from './components/PosterSlides'

import {
  Container,
  Grid,
  Typography,
  Button,
  Paper,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
} from '@material-ui/core'

import { Casino } from '@material-ui/icons'

import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  header: {
    display: 'flex',
    alignItems: 'center',
  },
  textPadding: {
    padding: '12px',
  },
}))

const Roulette = ({ user, config, getUserLists, getBuddiedLists }) => {
  const classes = useStyles()
  const [selectedList, setSelectedList] = useState(null)
  const [basket, setBasket] = useState([])
  const [userLists, setUserLists] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const userData = getUserLists(user.id)
      const buddyData = getBuddiedLists(user.id)
      const responses = await Promise.all([userData, buddyData])
      setUserLists([...responses[0], ...responses[1]])
      console.log(userLists)
    }
    if (user !== null) {
      fetchData()
    }
  }, [])

  const handleListChange = (e) => {
    setSelectedList(e.target.value)
  }

  const handleAddToBasket = (movieItem) => {
    setBasket([...basket, movieItem])
  }

  const removeFromBasket = (id) => {
    const filtered = basket.filter((movie) => movie.db_id !== id)
    setBasket(filtered)
  }

  const getRandom = () => {
    setBasket([basket[Math.floor(Math.random() * basket.length)]])
  }

  if (user === null) {
    return 'Please login or create an account!'
  }

  return (
    <Container component='main'>
      <Grid container spacing={3}>
        <Grid item xs={12} md={12}>
          <Typography
            className={classes.header}
            align='left'
            component='h1'
            variant='h6'
          >
            The Movie Roulette
            <Casino color='secondary' fontSize='inherit' />
          </Typography>
        </Grid>
        <Grid
          container
          item
          xs={12}
          alignItems='center'
          justify='center'
          spacing={3}
        >
          <Grid item xs={12} md={6}>
            <Typography className={classes.textPadding} variant='body2'>
              Select movies from your lists, either shared or personal and to
              add to the basket, a movie will be selected at random from your
              basket!
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl variant='outlined' style={{ width: '300px' }}>
              <InputLabel id='list-select-label'>Select list</InputLabel>
              <Select
                labelId='list-select-label'
                id='list-select'
                value={selectedList || ''}
                label='Select list'
                onChange={handleListChange}
              >
                {userLists.map((list) => (
                  <MenuItem key={list.title} value={list}>
                    {list.title}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Grid>

      <div style={{ paddingTop: '50px' }}>
        {selectedList && <h3>{selectedList.title}</h3>}
        {selectedList && (
          <PosterSlides
            movieData={selectedList.movies}
            config={config}
            handleBasketAdd={handleAddToBasket}
            hasBasket={true}
          />
        )}

        <div style={{ width: '100%' }}>
          <Button
            color='secondary'
            variant='contained'
            onClick={() => getRandom()}
          >
            get random
          </Button>
          <PosterSlides
            movieData={basket}
            config={config}
            handleDelete={removeFromBasket}
            isBasket={true}
            handleBasketDelete={removeFromBasket}
          />
        </div>
      </div>
    </Container>
  )
}

export default Roulette
