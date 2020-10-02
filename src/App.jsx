import React, { useState, useEffect } from 'react'
import Explore from './Explore'
import Layout from './components/Layout'
import Roulette from './Roulette'
import CreateList from './CreateList'
import MyLists from './MyLists'
import ExploreLists from './ExploreLists'
import MySharedLists from './MySharedLists'
import MovieDetails from './MovieDetails'
import { makeStyles } from '@material-ui/core/styles'

import tvdbService from './apis/tvdbService'

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

  useEffect(() => {
    const fetchMovies = async () => {
      await Promise.all([
        tvdbService.getImgConfig(),
        tvdbService.getTrending(),
        tvdbService.getTopRated(),
        tvdbService.getUpAndComing(),
      ]).then((responses) => {
        setConfig(responses[0].images)
        setTrending(responses[1].results)
        setTopRated(responses[2].results)
        setUpComing(responses[3].results)
        setIsLoading(false)
      })
    }

    fetchMovies()
  }, [])

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
      <Layout setUser={setUser}>
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
            render={(props) => <Roulette {...props} />}
          />
          <Route
            exact
            from='/movies/:id'
            render={(props) => (
              <MovieDetails
                {...props}
                config={config}
                getMovieDetails={getMovieDetails}
              />
            )}
          />
          <Route
            exact
            from='/create'
            render={(props) => <CreateList {...props} />}
          />
          <Route
            exact
            from='/mylists'
            render={(props) => <MyLists {...props} />}
          />
          <Route
            exact
            from='/explore'
            render={(props) => <ExploreLists {...props} />}
          />
          <Route
            exact
            from='/shared'
            render={(props) => <MySharedLists {...props} />}
          />
        </Switch>
      </Layout>
    </div>
  )
}

export default App
