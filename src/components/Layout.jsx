import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import {
  AppBar,
  Drawer,
  Hidden,
  IconButton,
  Toolbar,
  Typography,
  MenuItem,
  MenuList,
} from '@material-ui/core'

import ExploreIcon from '@material-ui/icons/Explore'
import CasinoIcon from '@material-ui/icons/Casino'
import CreateIcon from '@material-ui/icons/Create'
import MovieFilterIcon from '@material-ui/icons/MovieFilter'
import VisibilityIcon from '@material-ui/icons/Visibility'
import FaceIcon from '@material-ui/icons/Face'
import Burger from '@material-ui/icons/Menu'

import LogoIcon from '../assets/Logo'

import { makeStyles } from '@material-ui/core/styles'

const drawerWidth = 250
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

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    overflow: 'auto',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    width: '100vw',
  },
}))

const Layout = ({ children, window }) => {
  //   const { window } = props
  const classes = useStyles()
  const [mobileOpen, setMobileOpen] = useState(false)

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const drawer = menuItems.map((item) => {
    const { text, icon, onClick, path } = item
    return (
      <MenuItem component={Link} to={path} onClick={onClick}>
        <IconButton>{icon}</IconButton>
        {text}
      </MenuItem>
    )
  })

  return (
    <div className={classes.root}>
      <AppBar position='fixed' className={classes.appBar} color='inherit'>
        <Toolbar>
          <IconButton
            color='inherit'
            aria-label='open drawer'
            edge='start'
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <Burger />
          </IconButton>
          <IconButton>
            <LogoIcon />
          </IconButton>
          <Typography variant='h6' noWrap>
            WATOWATCH
          </Typography>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label='menu-links'>
        <Hidden smUp implementation='css'>
          <Drawer
            variant='temporary'
            anchor='left'
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // this be mobile
            }}
          >
            <Toolbar />
            <div className={classes.drawerContainer}>
              <MenuList>{drawer}</MenuList>
            </div>
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation='css'>
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            className={classes.drawer}
            variant='permanent'
            open
          >
            <Toolbar />
            <div className={classes.drawerContainer}>
              <MenuList>{drawer}</MenuList>
            </div>
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {children}
      </main>
    </div>
  )
}

export default Layout
