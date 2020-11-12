import React from 'react'
import { shallow, mount } from 'enzyme'
import { MemoryRouter as Router } from 'react-router-dom'
import MovieCard from '../MovieCard'
import { Typography } from '@material-ui/core'

describe('<MovieCard/>', () => {
  const movie = {
    title: 'test movie',
    overview: 'a testy movie',
  }

  it('renders title', () => {
    const wrapper = mount(<MovieCard title={movie.title} />)
    const title = <Typography>test movie</Typography>
    console.log(wrapper.find(title))
  })
})
