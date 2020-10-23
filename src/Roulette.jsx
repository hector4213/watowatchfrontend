import React, { useState, useEffect } from 'react'

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

const Roulette = ({ user, config, getUserLists, getBuddiedLists }) => {
  //TODO: get shared lists into roulette
  const [selectedList, setSelectedList] = useState(null)
  const [basket, setBasket] = useState([])
  const [winner, setWinner] = useState(null)
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
    console.log(e.target.value)
    setSelectedList(e.target.value)
  }

  const handleAddToBasket = (movieItem) => {
    setBasket([...basket, movieItem])
  }

  const removeFromBasket = (item) => {
    console.log('im removing from basket')
    const deleteItem = basket.filter((movie) => item.id !== movie.id)
    setBasket(deleteItem)
  }

  const getRandom = () => {
    setWinner(basket[Math.floor(Math.random() * basket.length)])
  }

  const selectedWinner = () => (
    <>
      <h1>{winner.title}</h1>
      <img
        src={config.base_url + config.poster_sizes[2] + winner.poster_path}
        alt='randomresult'
      />
    </>
  )

  if (user === null) {
    return 'Please login or create an account!'
  }

  return (
    <Container component='main'>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant='h4'>The Movie Roulette</Typography>
        </Grid>
        <Paper style={{ flexGrow: 1 }}>
          <Grid item container xs={12}>
            <Grid item xs={12} md={7}>
              <p>
                Select movies from your lists to add to the basket, a movie will
                be selected at random from your basket
              </p>
            </Grid>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant='subtitle1'>
              Please Select from your lists
            </Typography>
          </Grid>
          <Grid item xs={12} md={8}>
            <FormControl style={{ width: '300px' }}>
              <InputLabel id='list-select-label'>Select your lists</InputLabel>
              <Select
                labelId='list-select-label'
                id='list-select'
                value={selectedList || ''}
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
        </Paper>
      </Grid>
      <div style={{ paddingTop: '50px' }}>
        {selectedList && <h3>{selectedList.title}</h3>}
        {selectedList &&
          selectedList.movies.map((movie) => (
            <div key={movie.id} style={{ display: 'flex', width: '100%' }}>
              <p>{movie.title}</p>
              <Button
                color='secondary'
                onClick={() => handleAddToBasket(movie)}
              >
                Add to basket
              </Button>
              <img
                src={
                  config.base_url + config.poster_sizes[0] + movie.poster_path
                }
                alt='movieposter'
              />
            </div>
          ))}
        <div>
          <Button color='secondary' onClick={() => getRandom()}>
            get random
          </Button>
          <div>
            {basket.map((movie) => (
              <div>
                <p>{movie.title}</p>
                <Button onClick={() => removeFromBasket(movie)}>delete</Button>
              </div>
            ))}
          </div>
          <div>{winner ? selectedWinner() : null}</div>
        </div>
      </div>
    </Container>
  )
}

export default Roulette
