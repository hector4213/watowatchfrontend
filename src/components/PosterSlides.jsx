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
  updateSeen,
  hasDelete,
  hasAdd,
  hasSeen,
  hasBasket,
  handleDialogOpen,
  setMovie,
  handleBasketAdd,
  handleBasketDelete,
  isBasket,
}) => {
  const settings = {
    dots: false,
    infinite: false,
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
          infinite: false,
          dots: false,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: false,
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

  if (movieData.length < 1 || !movieData) {
    return null
  }

  return (
    <Slider {...settings} key={listId}>
      {movieData.map((movie) => (
        <div key={movie.details.id}>
          <MovieCard
            title={movie.details.original_title}
            overview={movie.details.overview}
            imageTitle={movie.details.original_title}
            src={
              config.base_url +
              config.poster_sizes[2] +
              movie.details.poster_path
            }
            year={movie.details.release_date.substring(0, 4)}
            id={movie.db_id}
            tvdb={movie.details.id}
            genre={
              movie.details.genres ? movie.details.genres[0].name : 'unknown'
            }
            listId={listId}
            seen={movie.seen}
            handleDelete={handleDelete}
            updateSeen={updateSeen}
            hasDelete={hasDelete}
            hasAdd={hasAdd}
            hasSeen={hasSeen}
            hasBasket={hasBasket}
            handleDialogOpen={handleDialogOpen}
            setMovie={setMovie}
            handleBasketAdd={handleBasketAdd}
            handleBasketDelete={handleBasketDelete}
            isBasket={isBasket}
            details={movie.details}
          />
        </div>
      ))}
    </Slider>
  )
}

export default PosterSlides
