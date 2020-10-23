import React, { useState, useEffect } from 'react'
import PosterSlides from './components/PosterSlides'

import listService from './apis/listService'
import tvdbService from './apis/tvdbService'

import { Container, Typography, Grid } from '@material-ui/core'

const MySharedLists = ({ user, config, getBuddiedLists }) => {
  const [buddyLists, setBuddyLists] = useState([])

  const fetchBuddiedLists = async () => {
    const response = await getBuddiedLists(user.id)
    setBuddyLists(response)
  }

  const handleDelete = async (listId, deleted) => {
    try {
      const deleteMovie = {
        movieId: deleted,
      }
      await listService.removeMovieFromList(listId, deleteMovie)
      const updatedList = buddyLists.map((list) => {
        if (list.list_id !== listId) {
          return list
        }
        return {
          ...list,
          movies: list.movies.filter(
            (movie) => movie.id !== deleteMovie.movieId
          ),
        }
      })
      setBuddyLists(updatedList)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (user) {
      fetchBuddiedLists()
    }
  }, [user])
  return (
    <Container>
      <Typography component='h1' variant='h3'>
        Buddied User Lists
      </Typography>
      <Grid container spacing={3}>
        {buddyLists.map((list) => (
          <Grid item xs={12}>
            <p>{list.title}</p>
            <PosterSlides
              movieData={list.movies}
              config={config}
              hasDelete={true}
              listId={list.list_id}
              handleDelete={handleDelete}
            />
            {list.buddy_ids.map((buddy) => (
              <div>
                <p>{buddy.f1}</p>
                <p>{buddy.f2}</p>
              </div>
            ))}
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}

export default MySharedLists
