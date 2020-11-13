import React from 'react'

import {
  Box,
  List,
  ListItem,
  ListItemIcon,
  Divider,
  ListItemText,
  ListSubheader,
} from '@material-ui/core'

import { makeStyles } from '@material-ui/core/styles'

import { FormatListBulleted, Theaters, EmojiPeople } from '@material-ui/icons'

const useStyles = makeStyles((theme) => ({
  listInfo: {
    backgroundColor: theme.palette.background.paper,
  },
}))

const CreateListInfo = ({ numLists, numMovies, numBuddies }) => {
  const classes = useStyles()
  return (
    <Box elevation={3}>
      <List
        className={classes.listInfo}
        subheader={<ListSubheader>Info</ListSubheader>}
      >
        <ListItem>
          <ListItemIcon>
            <FormatListBulleted />
          </ListItemIcon>
          <ListItemText primary={`You have ${numLists} lists`}></ListItemText>
        </ListItem>
        <Divider variant='inset' component='li' />
        <ListItem>
          <ListItemIcon>
            <Theaters />
          </ListItemIcon>
          <ListItemText
            primary={`That total ${numMovies} movies`}
          ></ListItemText>
        </ListItem>
        <Divider variant='inset' component='li' />
        <ListItem>
          <ListItemIcon>
            <EmojiPeople />
          </ListItemIcon>
          <ListItemText
            primary={`With ${numBuddies} unique buddies`}
          ></ListItemText>
        </ListItem>
        <Divider variant='inset' component='li' />
      </List>
    </Box>
  )
}

export default CreateListInfo
