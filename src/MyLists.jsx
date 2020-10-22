import React, { useState, useEffect } from 'react'

import { Typography, Container, Grid, Chip } from '@material-ui/core'
import { Face } from '@material-ui/icons'

import { makeStyles } from '@material-ui/styles'

import listService from './apis/listService'

import PosterSlides from './components/PosterSlides'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(0.5),
    },
  },
}))

const MyLists = ({ user, config, getUserLists }) => {
  const [userLists, setUserLists] = useState([])
  const classes = useStyles()

  const fetchData = async () => {
    const movieResponses = await getUserLists(user.id)
    setUserLists(movieResponses)
  }

  const removeBuddy = async (listId, id) => {
    try {
      const response = await listService.removeBuddy(listId, id)

      const updateBuddies = userLists.map((list) => {
        if (list.list_id !== listId) {
          return list
        } else {
          return {
            ...list,
            buddy_ids: list.buddy_ids.filter((buddy) => buddy.f2 !== id),
          }
        }
      })
      console.log(updateBuddies)
      setUserLists(updateBuddies)
    } catch (error) {
      console.log(error)
    }
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
  }, [user])

  return (
    <Container>
      <Grid container spacing={3}>
        <Grid item xs={12} md={12}>
          <Typography>{`${user.name} Lists`}</Typography>
        </Grid>

        {userLists.map((list) => (
          <>
            <Grid item xs={12}>
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
            </Grid>
            <Grid className={classes.root} item xs={12}>
              {list.buddy_ids.map((buddy) => (
                <Chip
                  key={buddy.f2}
                  icon={<Face />}
                  label={buddy.f1}
                  onDelete={() => removeBuddy(list.list_id, buddy.f2)}
                />
              ))}
            </Grid>
          </>
        ))}
      </Grid>
    </Container>
  )
}

export default MyLists
