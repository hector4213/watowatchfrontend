import React from 'react'
import { shallow, mount } from 'enzyme'
import { MemoryRouter as Router } from 'react-router-dom'
import PosterSlides from '../PosterSlides'

describe('PosterSlides component', () => {
  const movieData = [
    {
      title: 'test movie',
      overview: 'very good',
      src: 'google.com',
      imageTitle: 'very good',

      details: {
        orginal_title: 'test movie',
        imageTitle: 'test movie',
        poster_path: '/45345',
        release_date: '2020-11-1',
        id: 345345,
      },
    },
    {
      title: 'test movie2',
      overview: 'very good2',
      src: 'google2.com',
      imageTitle: 'very good2',

      details: {
        orginal_title: 'test movie2',
        imageTitle: 'test movie2',
        poster_path: '/453452',
        release_date: '2020-11-12',
        id: 3453452,
      },
    },
  ]

  const config = {
    base_url: 'www.img.com',
    poster_sizes: [121, 177],
  }

  it('receives moviedata prop', () => {
    const wrapper = shallow(
      <Router>
        <PosterSlides movieData={movieData} config={config} />
      </Router>
    )

    expect(wrapper.find('PosterSlides').props().movieData).toBe(movieData)
  })

  it('receives config prop', () => {
    const wrapper = shallow(
      <Router>
        <PosterSlides movieData={movieData} config={config} />
      </Router>
    )
    expect(wrapper.find('PosterSlides').props().config).toBe(config)
  })

  it('slider renders 2 movie items', () => {
    const wrapper = mount(
      <Router>
        <PosterSlides movieData={movieData} config={config} />
      </Router>
    )
    const posterWrapper = wrapper.find('MovieCard')
    expect(posterWrapper).toHaveLength(2)
  })
})
