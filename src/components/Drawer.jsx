import React from 'react'

import {
  Drawer as MUIDrawer,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core'

import { Link } from 'react-router-dom'

import LogoIcon from '../assets/Logo'

import ExploreIcon from '@material-ui/icons/Explore'
import CasinoIcon from '@material-ui/icons/Casino'
import CreateIcon from '@material-ui/icons/Create'
import MovieFilterIcon from '@material-ui/icons/MovieFilter'
import VisibilityIcon from '@material-ui/icons/Visibility'
import FaceIcon from '@material-ui/icons/Face'

import { withRouter } from 'react-router-dom'

import { makeStyles } from '@material-ui/core/styles'

const drawerWidth = '250px'

const useStyles = makeStyles((theme) => ({
  logo: {
    maxWidth: '55px',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  icon: {
    height: '50px',
    width: '50px',
  },
}))

const Drawer = (props) => {
  const classes = useStyles()
  const menuItems = [
    {
      text: 'Explore Movies',
      icon: <ExploreIcon />,
      path: '/',
    },
    {
      text: 'Movie Roulette',
      icon: <CasinoIcon />,
      path: '/roulette',
    },
    {
      text: 'Create New List',
      icon: <CreateIcon />,
      path: '/create',
    },
    {
      text: 'My Lists',
      icon: <MovieFilterIcon />,
      path: '/mylists',
    },
    {
      text: 'Explore Lists',
      icon: <VisibilityIcon />,
      path: '/explore',
    },
    {
      text: 'Shared Lists',
      icon: <FaceIcon />,
      path: '/shared',
    },
  ]
  return (
    <MUIDrawer
      variant='permanent'
      className={classes.drawer}
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <List>
        <ListItem>
          <ListItemIcon>
            <LogoIcon className={classes.icon} />
          </ListItemIcon>
          <ListItemText>WATOWATCH</ListItemText>
        </ListItem>
        <Divider />
        {menuItems.map((item) => {
          const { text, icon, onClick, path } = item
          return (
            <Link to={path} key={text}>
              <ListItem button key={text} onClick={onClick}>
                {icon && <ListItemIcon>{icon}</ListItemIcon>}
                <ListItemText primary={text} />
              </ListItem>
            </Link>
          )
        })}
      </List>
    </MUIDrawer>
  )
}

export default withRouter(Drawer)
