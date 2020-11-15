import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'

import { ExpandMore } from '@material-ui/icons'

import DeleteButton from './DeleteButton'
import AddButton from './AddButton'
import MarkSeen from './MarkSeen'
import AddBasket from './AddBasket'
import BasketDelete from './BasketDelete'

import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Collapse,
  IconButton,
} from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 185,
  },
  media: {
    minHeight: 277,
    width: 185,
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
  tvdb,
  genre,
  handleDelete,
  updateSeen,
  listId,
  hasDelete,
  hasAdd,
  hasBasket,
  hasSeen,
  handleDialogOpen,
  seen,
  handleBasketAdd,
  handleBasketDelete,
  isBasket,
  details,
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
    db_id: id,
    details,
  }

  return (
    <Card className={classes.root} key={id}>
      <CardMedia
        className={classes.media}
        component={Link}
        to={`/movies/${tvdb}`}
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
          listId={listId}
          id={id}
        />
        <BasketDelete
          onClick={handleBasketDelete}
          id={id}
          isBasket={isBasket}
        />
        <AddButton
          hasAdd={hasAdd}
          onClick={() => handleDialogOpen(movieSelection)}
        />
        <AddBasket
          hasBasket={hasBasket}
          onClick={handleBasketAdd}
          movieSelection={movieSelection}
        />
        <MarkSeen
          onClick={updateSeen}
          listId={listId}
          id={id}
          hasSeen={hasSeen}
          seen={seen}
        />
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
