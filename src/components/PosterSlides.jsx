import React from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import MovieCard from '../components/MovieCard'

const PosterSlides = ({
  movieData,
  config,
  listId,
  handleDelete,
  hasDelete,
  hasAdd,
  handleDialogOpen,
  setMovie,
}) => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 6,
    adaptiveHeight: true,
    responsive: [
      {
        breakpoint: 1366,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 5,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: false,
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

  if (!movieData) {
    return 'Loading...'
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
          key={movie.id}
          id={movie.id}
          genre={movie.genres[0].name}
          listId={listId}
          handleDelete={handleDelete}
          hasDelete={hasDelete}
          hasAdd={hasAdd}
          handleDialogOpen={handleDialogOpen}
          setMovie={setMovie}
        />
      ))}
    </Slider>
  )
}

export default PosterSlides
