import React, { useState } from 'react'

import { makeStyles } from '@material-ui/core/styles'

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

import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

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

const MovieCard = ({ title, overview, src, imageTitle, year }) => {
  const classes = useStyles()
  const [expanded, setExpanded] = useState(false)

  const expandToggle = () => {
    setExpanded(!expanded)
  }

  const isExpanded = expanded ? classes.expandOpen : null

  return (
    <Card className={classes.root}>
      <CardMedia className={classes.media} image={src} title={imageTitle} />

      <CardActions disableSpacing>
        <IconButton
          className={isExpanded}
          onClick={expandToggle}
          aria-expanded={expanded}
          aria-label='see-overview'
        >
          <ExpandMoreIcon />
        </IconButton>
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
