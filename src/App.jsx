import React from 'react'
import Drawer from './components/Drawer'
import Explore from './Explore'
import Roulette from './Roulette'
import CreateList from './CreateList'
import MyLists from './MyLists'
import ExploreLists from './ExploreLists'
import MySharedLists from './MySharedLists'
import { makeStyles } from '@material-ui/core/styles'

import { Route, Switch } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
  },
}))

const App = () => {
  const classes = useStyles()
  return (
    <div className={classes.container}>
      <Drawer />
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
    </div>
  )
}

export default App
