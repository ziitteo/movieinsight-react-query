import React from 'react';
import { Alert, Spinner } from 'react-bootstrap';
import usePopularMoviesQuery from '../../../../hooks/usePopularMovies';
import MovieSlider from '../../../../common/MovieSlider/MovieSlider';
import responsive from '../../../../constants/responsive';

const PopularMovieSlide = () => {
  const { data, isLoading, isError, error } = usePopularMoviesQuery();

  if (isLoading) {
    return <Spinner animation='border' variant='warning' />;
  }

  if (isError) {
    return <Alert variant='danger'>Error: {error.message}</Alert>;
  }

  return (
    <div>
      <MovieSlider title='인기 영화' movies={data.results} responsive={responsive} />
    </div>
  );
};

export default PopularMovieSlide;
