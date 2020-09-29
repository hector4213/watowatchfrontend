import React from 'react'
import Explore from './Explore'
import Layout from './components/Layout'
import Roulette from './Roulette'
import CreateList from './CreateList'
import MyLists from './MyLists'
import ExploreLists from './ExploreLists'
import MySharedLists from './MySharedLists'
import MovieDetails from './MovieDetails'
import { makeStyles } from '@material-ui/core/styles'

import { Route, Switch } from 'react-router-dom'
import './App.css'

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
  },
}))

const App = () => {
  const classes = useStyles()
  return (
    <div className={classes.container}>
      <Layout>
        <Switch>
          <Route exact from='/' render={(props) => <Explore {...props} />} />
          <Route
            exact
            from='/roulette'
            render={(props) => <Roulette {...props} />}
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
