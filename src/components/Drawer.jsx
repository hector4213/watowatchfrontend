import React from 'react'

import {
  Drawer as MUIDrawer,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core'

import ExploreIcon from '@material-ui/icons/Explore'
import CasinoIcon from '@material-ui/icons/Casino'
import CreateIcon from '@material-ui/icons/Create'
import MovieFilterIcon from '@material-ui/icons/MovieFilter'
import VisibilityIcon from '@material-ui/icons/Visibility'
import FaceIcon from '@material-ui/icons/Face'

import { withRouter } from 'react-router-dom'

import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
  drawer: {
    width: '250px',
  },
})

const Drawer = (props) => {
  const { history } = props
  const classes = useStyles()
  const menuItems = [
    {
      text: 'Explore Movies',
      icon: <ExploreIcon />,
      onClick: () => history.push('/'),
    },
    {
      text: 'Movie Roulette',
      icon: <CasinoIcon />,
      onClick: () => history.push('/roulette'),
    },
    {
      text: 'Create New List',
      icon: <CreateIcon />,
      onClick: () => history.push('/create'),
    },
    {
      text: 'My Lists',
      icon: <MovieFilterIcon />,
      onClick: () => history.push('/mylists'),
    },
    {
      text: 'Explore Lists',
      icon: <VisibilityIcon />,
      onClick: () => history.push('/explore'),
    },
    {
      text: 'Shared Lists',
      icon: <FaceIcon />,
      onClick: () => history.push('/shared'),
    },
  ]
  return (
    <MUIDrawer variant='permanent' className={classes.drawer}>
      <List>
        <ListItem></ListItem>
        <Divider />
        {menuItems.map((item, index) => {
          const { text, icon, onClick } = item
          return (
            <ListItem button key={text} onClick={onClick}>
              {icon && <ListItemIcon>{icon}</ListItemIcon>}
              <ListItemText primary={text} />
            </ListItem>
          )
        })}
      </List>
    </MUIDrawer>
  )
}

export default withRouter(Drawer)
