import React from 'react';
import { Alert, Spinner } from 'react-bootstrap';
import useTopRatedMoviesQuery from '../../../../hooks/useTopRatedMovies';
import MovieSlider from '../../../../common/MovieSlider/MovieSlider';
import responsive from '../../../../constants/responsive';

const TopRatedMovieSlide = () => {
  const { data, isLoading, isError, error } = useTopRatedMoviesQuery();

  if (isLoading) {
    return <Spinner animation='border' variant='primary' />;
  }

  if (isError) {
    return <Alert variant='danger'>Error: {error.message}</Alert>;
  }

  return (
    <div>
      <MovieSlider title='평점 높은 영화' movies={data.results} responsive={responsive} />
    </div>
  );
};

export default TopRatedMovieSlide;
