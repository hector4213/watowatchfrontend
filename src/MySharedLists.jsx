import React, { useState, useEffect } from 'react'
import PosterSlides from './components/PosterSlides'

import listService from './apis/listService'

import { Container, Typography, Grid } from '@material-ui/core'

const MySharedLists = ({ user, config, getBuddiedLists }) => {
  const [buddyLists, setBuddyLists] = useState([])

  const fetchBuddiedLists = async () => {
    const response = await getBuddiedLists(user.id)
    setBuddyLists(response)
  }

  const handleDelete = async (listId, deleted) => {
    try {
      await listService.removeMovieFromList(listId, deleted)
      const updatedList = buddyLists.map((list) => {
        if (list.list_id !== listId) {
          return list
        }
        return {
          ...list,
          movies: list.movies.filter((movie) => movie.db_id !== deleted),
        }
      })
      setBuddyLists(updatedList)
    } catch (error) {
      console.log(error)
    }
  }

  const updateSeen = async (listId, movieId) => {
    try {
      console.log(movieId, 'this is movieid')
      await listService.setSeen(listId, movieId)
      const updatedList = buddyLists.map((list) => {
        if (list.list_id !== listId) {
          return list
        }
        return {
          ...list,
          movies: list.movies.map((movie) => {
            if (movie.db_id === movieId) {
              return {
                ...movie,
                seen: !movie.seen,
              }
            }
            return movie
          }),
        }
      })
      console.log(updatedList)
      setBuddyLists(updatedList)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (user) {
      fetchBuddiedLists()
    }
  }, [])
  return (
    <Container>
      <Typography component='h1' variant='h3'>
        Buddied User Lists
      </Typography>
      <Grid container spacing={3}>
        {buddyLists.map((list) => (
          <Grid item xs={12}>
            <p>
              {list.title} Author: {list.author}
            </p>
            <PosterSlides
              movieData={list.movies}
              config={config}
              hasDelete={true}
              listId={list.list_id}
              handleDelete={handleDelete}
              updateSeen={updateSeen}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}

export default MySharedLists
