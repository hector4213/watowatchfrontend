import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'

import { DoneOutlineRounded, ExpandMore } from '@material-ui/icons'

import DeleteButton from './DeleteButton'
import AddButton from './AddButton'

import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Collapse,
  IconButton,
  Button,
} from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  root: {
    width: 185,
  },
  media: {
    height: 277,
  },
  cardHeader: {
    flex: '1',
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
}))

const MovieCard = ({
  title,
  overview,
  src,
  imageTitle,
  year,
  id,
  genre,
  handleDelete,
  updateSeen,
  listId,
  hasDelete,
  hasAdd,
  handleDialogOpen,
  seen,
}) => {
  const classes = useStyles()
  const [expanded, setExpanded] = useState(false)

  const expandToggle = () => {
    setExpanded(!expanded)
  }

  const isExpanded = expanded ? classes.expandOpen : null

  const movieSelection = {
    title,
    genre,
    tvdb_movieid: id,
  }

  console.log(seen)

  return (
    <Card className={classes.root} key={id}>
      <CardMedia
        className={classes.media}
        component={Link}
        to={`/movies/${id}`}
        image={src}
        title={imageTitle}
      />

      <CardActions disableSpacing>
        <IconButton
          className={isExpanded}
          onClick={expandToggle}
          aria-expanded={expanded}
          aria-label='see-overview'
        >
          <ExpandMore />
        </IconButton>
        <DeleteButton
          hasDelete={hasDelete}
          onClick={() => handleDelete(listId, id)}
        />
        <AddButton
          hasAdd={hasAdd}
          onClick={() => handleDialogOpen(movieSelection)}
        />
        {seen ? (
          <DoneOutlineRounded onClick={() => updateSeen(listId, id)} />
        ) : (
          <Button size='small' onClick={() => updateSeen(listId, id)}>
            Mark as seen
          </Button>
        )}
      </CardActions>
      <CardHeader
        title={title}
        subheader={year}
        className={classes.cardHeader}
        titleTypographyProps={{ fontSize: '0.8rem', noWrap: true }}
      />
      <Collapse in={expanded} timeout='auto' unmountOnExit>
        <CardContent>
          <Typography variant='body2' color='textSecondary' component='p'>
            {overview}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  )
}

export default MovieCard
