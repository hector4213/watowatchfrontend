import React, { useState, useEffect } from 'react'
import Explore from './Explore'
import Layout from './components/Layout'
import Roulette from './Roulette'
import CreateList from './CreateList'
import MyLists from './MyLists'
import ExploreLists from './ExploreLists'
import MovieDetails from './MovieDetails'
import UserProfile from './UserProfile'
import MySharedLists from './MySharedLists'
import { makeStyles } from '@material-ui/core/styles'
import Loader from './components/Loader'

import tvdbService from './apis/tvdbService'
import listService from './apis/listService'
import './App.css'

import { Route, Switch } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
  },
}))

const App = () => {
  const [user, setUser] = useState(null)
  const [trending, setTrending] = useState([])
  const [config, setConfig] = useState([])
  const [topRated, setTopRated] = useState([])
  const [upComing, setUpComing] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const isLoggedIn = () => {
    const loggedUserJSON = window.localStorage.getItem('loggedInUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      listService.setToken(user.token)
      return true
    }
  }

  useEffect(() => {
    const fetchMovies = async () => {
      const imgData = await tvdbService.getImgConfig()
      const responses = await Promise.all([
        tvdbService.getTrending(),
        tvdbService.getTopRated(),
        tvdbService.getUpAndComing(),
      ])

      const addDetails = responses.map((arr) => {
        return arr.map((movie) => {
          return {
            details: movie,
          }
        })
      })
      setConfig(imgData)
      setTrending(addDetails[0])
      setTopRated(addDetails[1])
      setUpComing(addDetails[2])
      setIsLoading(false)
    }
    isLoggedIn()
    fetchMovies()
  }, [])

  const getUserLists = async (id) => {
    const lists = await listService.getUserLists(id)
    const promises = lists.map(async (list) => {
      const movieDetailsPromises = list.movies.map((movie) =>
        tvdbService.getMovieDetails(movie.tvdb_movieid)
      )
      const movieDetails = await Promise.all(movieDetailsPromises)
      const movieProps = list.movies
      const matchMovieDetails = (id) => {
        return movieDetails.find((movie) => movie.id === id)
      }
      const movieData = movieProps.map((movie) => ({
        ...movie,
        details: matchMovieDetails(movie.tvdb_movieid),
      }))
      return { ...list, movies: movieData }
    })
    const movieResponses = await Promise.all(promises)
    return movieResponses
  }

  const getBuddiedLists = async (id) => {
    const lists = await listService.getBuddiedList(id)
    const promises = lists.map(async (list) => {
      const movieDetailsPromises = list.movies.map((movie) =>
        tvdbService.getMovieDetails(movie.tvdb_movieid)
      )
      const movieDetails = await Promise.all(movieDetailsPromises)
      const movieProps = list.movies
      const matchMovieDetails = (id) => {
        return movieDetails.find((movie) => movie.id === id)
      }
      const movieData = movieProps.map((movie) => ({
        ...movie,
        details: matchMovieDetails(movie.tvdb_movieid),
      }))

      return { ...list, movies: movieData }
    })
    const movieResponses = await Promise.all(promises)
    return movieResponses
  }

  const getMovieDetails = (id) => {
    return Promise.all([
      tvdbService.getMovieDetails(id),
      tvdbService.getRecommendations(id),
    ])
  }

  const classes = useStyles()

  if (isLoading) {
    return <Loader size={100} />
  }
  return (
    <div className={classes.container}>
      <Layout setUser={setUser} user={user}>
        <Switch>
          <Route
            exact
            from='/'
            render={(props) => (
              <Explore
                {...props}
                trending={trending}
                config={config}
                topRated={topRated}
                upComing={upComing}
                isLoading={isLoading}
              />
            )}
          />
          <Route
            exact
            from='/roulette'
            render={(props) => (
              <Roulette
                {...props}
                user={user}
                config={config}
                getUserLists={getUserLists}
                getBuddiedLists={getBuddiedLists}
              />
            )}
          />
          <Route
            exact
            from='/movies/:id'
            render={(props) => (
              <MovieDetails
                {...props}
                config={config}
                getMovieDetails={getMovieDetails}
                getUserLists={getUserLists}
                getBuddiedLists={getBuddiedLists}
                user={user}
              />
            )}
          />
          <Route
            exact
            from='/create'
            render={(props) => (
              <CreateList {...props} user={user} getUserLists={getUserLists} />
            )}
          />
          <Route
            exact
            from='/mylists'
            render={(props) => (
              <MyLists
                {...props}
                user={user}
                config={config}
                getUserLists={getUserLists}
              />
            )}
          />
          <Route
            path='/explore'
            render={({ match: { url } }) => (
              <>
                <Route path={`${url}/`} component={ExploreLists} exact />
                <Route
                  path={`${url}/profile/:id`}
                  render={(props) => (
                    <UserProfile
                      {...props}
                      currentUser={user.id}
                      config={config}
                      getUserLists={getUserLists}
                    />
                  )}
                />
              </>
            )}
          />
          <Route
            exact
            from='/shared'
            render={(props) => (
              <MySharedLists
                {...props}
                user={user}
                config={config}
                getUserLists={getUserLists}
                getBuddiedLists={getBuddiedLists}
              />
            )}
          />
        </Switch>
      </Layout>
    </div>
  )
}

export default App
