import React from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import MovieCard from '../components/MovieCard'

const PosterGrid = ({ movieData, config }) => {
  console.log('this is from poster grid', config.poster_sizes[0])
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 6,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  }

  return (
    <Slider {...settings}>
      {movieData.map((movie) => (
        <MovieCard
          title={movie.title}
          overview={movie.overview}
          imageTitle={movie.title}
          src={config.base_url + config.poster_sizes[2] + movie.poster_path}
          year={movie.release_date.substring(0, 4)}
        />
      ))}
    </Slider>
  )
}

export default PosterGrid
