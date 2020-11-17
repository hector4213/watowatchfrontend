import React from 'react'
import { Link } from 'react-router-dom'

import { ListAltRounded, Contacts } from '@material-ui/icons'

import {
  Box,
  Chip,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core/'
import { makeStyles } from '@material-ui/core/styles'

const hasNoLists = (
  <ListItem>
    <ListItemIcon>
      <ListAltRounded />
    </ListItemIcon>
    <ListItemText primary={'0 lists'} />
  </ListItem>
)

const useStyles = makeStyles((theme) => ({}))
const UserListInfo = ({ user }) => {
  const classes = useStyles()
  return (
    <Box elevation={3}>
      <List>
        <ListItem>
          {' '}
          <Chip
            icon={<Contacts />}
            label={user.first_name}
            component={Link}
            color='secondary'
            to={`/explore/profile/${user.id}`}
          />
        </ListItem>

        {user.movelists.length < 1
          ? hasNoLists
          : user.movelists.map((list) => (
              <ListItem>
                <ListItemIcon>
                  <ListAltRounded />
                </ListItemIcon>
                <ListItemText primary={list.title} />
              </ListItem>
            ))}
      </List>
    </Box>
  )
}

export default UserListInfo
