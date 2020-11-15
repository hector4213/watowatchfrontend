import React from 'react'
import { createMount, createShallow } from '@material-ui/core/test-utils'
import { MemoryRouter as Router } from 'react-router-dom'
import MovieCard from '../MovieCard'
import { Typography } from '@material-ui/core'

describe('<MovieCard/>', () => {
  let mount

  beforeEach(() => {
    mount = createMount()
  })
  afterEach(() => {
    mount.cleanUp()
  })

  const movie = {
    title: 'test movie',
    overview: 'a testy movie',
  }

  it('displays movie title', () => {
    const wrapper = mount(
      <Router>
        <MovieCard title={movie.title} />
      </Router>
    )
  })

  it('displays add button if prop passed', () => {
    const wrapper = mount(
      <Router>
        <MovieCard title={movie.title} hasAdd={true} />
      </Router>
    )
    const renderedChildren = wrapper.find('AddButton').children()
    expect(renderedChildren).toHaveLength(1)
  })
})
