import React, { useState, useEffect } from 'react'
import Explore from './Explore'
import Layout from './components/Layout'
import Roulette from './Roulette'
import CreateList from './CreateList'
import MyLists from './MyLists'
import ExploreLists from './ExploreLists'
import MySharedLists from './MySharedLists'
import MovieDetails from './MovieDetails'
import UserProfile from './UserProfile'
import { makeStyles } from '@material-ui/core/styles'

import tvdbService from './apis/tvdbService'
import listService from './apis/listService'
import userService from './apis/userService'

import { Route, Switch } from 'react-router-dom'
import './App.css'

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
    //TODO: change to async/await
    const fetchMovies = async () => {
      const responses = await Promise.all([
        tvdbService.getImgConfig(),
        tvdbService.getTrending(),
        tvdbService.getTopRated(),
        tvdbService.getUpAndComing(),
      ])
      setConfig(responses[0])
      setTrending(responses[1])
      setTopRated(responses[2])
      setUpComing(responses[3])
      setIsLoading(false)
    }
    isLoggedIn()
    fetchMovies()
    console.log(user)
  }, [])

  const getUserLists = async () => {
    const lists = await userService.getUserLists(user.id)
    const promises = lists.map(async (list) => {
      const movieDetailsPromises = list.movies.map((movie) =>
        tvdbService.getMovieDetails(movie)
      )
      const movieDetails = await Promise.all(movieDetailsPromises)
      return { ...list, movies: movieDetails }
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
    return 'loading....'
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
              />
            )}
          />
          <Route
            exact
            from='/create'
            render={(props) => <CreateList {...props} user={user} />}
          />
          <Route
            exact
            from='/mylists'
            render={(props) => (
              <MyLists {...props} user={user} config={config} />
            )}
          />
          <Route
            path='/explore'
            render={({ match: { url } }) => (
              <>
                <Route path={`${url}/`} component={ExploreLists} exact />
                <Route path={`${url}/profile/:id`} component={UserProfile} />
              </>
            )}
          />
        </Switch>
      </Layout>
    </div>
  )
}

export default App
