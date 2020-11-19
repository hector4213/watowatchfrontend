import React, { useState, useEffect } from 'react'

import RandomSelection from './components/RandomSelection'
import RouletteSelect from './components/RouletteSelect'
import RouletteLists from './components/RouletteLists'

import { Container, Grid, Typography, Button, Paper } from '@material-ui/core'

import { Casino } from '@material-ui/icons'

import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  header: {
    display: 'flex',
    alignItems: 'center',
  },
  paper: {
    minHeight: '414px',
    padding: 10,
  },
}))

const Roulette = ({ user, config, getUserLists, getBuddiedLists }) => {
  const classes = useStyles()
  const [selectedList, setSelectedList] = useState(null)
  const [basket, setBasket] = useState([])
  const [userLists, setUserLists] = useState([])
  const [hasSpun, setHasSpun] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      const userData = await getUserLists(user.id)
      const buddyData = await getBuddiedLists(user.id)
      const responses = await Promise.all([userData, buddyData])
      setUserLists([...responses[0], ...responses[1]])
    }
    if (user !== null) {
      fetchData()
    }
  }, [])

  const handleListChange = (e) => {
    setSelectedList(e.target.value)
  }

  const preventDuplicate = (movieItem) => {
    return basket.find((movie) => movie.db_id === movieItem.db_id)
  }

  const handleAddToBasket = (movieItem) => {
    if (preventDuplicate(movieItem)) {
      setBasket([...basket])
    } else {
      setBasket([...basket, movieItem])
    }
  }

  const removeFromBasket = (id) => {
    const filtered = basket.filter((movie) => movie.db_id !== id)
    setBasket(filtered)
  }

  const getRandom = () => {
    const random = basket[Math.floor(Math.random() * basket.length)]
    const winner = basket
      .filter((movie) => random.db_id === movie.db_id)
      .map((item) => ({ ...item, winner: true }))
    setHasSpun(true)
    setBasket(winner)
  }

  const resetBasket = () => {
    setBasket([])
  }

  if (!user) {
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
            <Typography variant='body2'>
              Select movies from your lists, either shared or personal and to
              add to the basket, a movie will be selected at random from your
              basket!
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <RouletteSelect
              label='Choose from your lists'
              value={selectedList}
              lists={userLists}
              handleListChange={handleListChange}
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid container spacing={5} xs={12} alignItems='center'>
        <Grid item xs={3} />
        <RouletteLists
          selectedList={selectedList}
          handleAddToBasket={handleAddToBasket}
          config={config}
        />
        <Grid item xs={6}>
          <Button
            color='secondary'
            variant='contained'
            size='large'
            disabled={!hasSpun}
            onClick={() => resetBasket()}
          >
            reset
          </Button>
        </Grid>
        <Grid item xs={5}>
          <Button
            color='secondary'
            variant='contained'
            size='large'
            onClick={() => getRandom()}
          >
            get random
          </Button>
        </Grid>
        <Grid item xs={12} md={12}>
          <Paper className={classes.paper}>
            <RandomSelection
              basket={basket}
              config={config}
              handleBasketDelete={removeFromBasket}
              isBasket={true}
            />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  )
}

export default Roulette
