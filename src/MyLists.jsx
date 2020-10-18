import React, { useState, useEffect } from 'react'

import { Typography, Container, Grid } from '@material-ui/core'

import { makeStyles } from '@material-ui/styles'

import listService from './apis/listService'

import PosterSlides from './components/PosterSlides'

const useStyles = makeStyles({
  root: {},
})

const MyLists = ({ user, config, getUserLists }) => {
  const [userLists, setUserLists] = useState([])

  const fetchData = async () => {
    const movieResponses = await getUserLists(user.id)
    setUserLists(movieResponses)
  }

  const handleDelete = async (listId, deleted) => {
    try {
      const deleteMovie = {
        movieId: deleted,
      }
      await listService.removeMovieFromList(listId, deleteMovie)
      const updatedList = userLists.map((list) => {
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
      setUserLists(updatedList)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (user !== null) {
      fetchData()
    }
  }, [])

  return (
    <Container>
      <Grid container spacing={3}>
        <Grid item xs={12} md={12}>
          <Typography>{`${user.name} Lists`}</Typography>
        </Grid>
        <Grid item xs={12}>
          {userLists.map((list) => (
            <div key={list.list_id}>
              {list.title}
              <PosterSlides
                movieData={list.movies}
                config={config}
                listId={list.list_id}
                handleDelete={handleDelete}
                hasDelete={true}
              />
            </div>
          ))}
        </Grid>
      </Grid>
    </Container>
  )
}

export default MyLists
