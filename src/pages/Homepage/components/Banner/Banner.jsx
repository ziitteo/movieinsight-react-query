import React from 'react';
import Slider from 'react-slick';
import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert';
import useNowPlayingMoviesQuery from '../../../../hooks/useNowPlayingMovies';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './Banner.style.css';

const Banner = () => {
  const { data, isLoading, isError, error } = useNowPlayingMoviesQuery();

  const settings = {
    dots: true,
    className: 'center',
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    centerPadding: '60px',
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
  };

  if (isLoading) {
    return <Spinner animation='border' variant='primary' />;
  }

  if (isError) {
    return <Alert variant='danger'>Error: {error.message}</Alert>;
  }

  return (
    <div className='slider-container'>
      <Slider {...settings} className='slider'>
        {data?.results?.map(movie => (
          <div key={movie.id} className='banner'>
            <img
              src={`https://media.themoviedb.org/t/p/w1066_and_h600_bestv2${movie.backdrop_path}`}
              alt={movie.title}
              className='banner-image'
            />
            <div className='text-white banner-text-area'>
              <h1>{movie.title}</h1>
              <p>{movie.overview}</p>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Banner;
