import React from 'react';
import { Alert, Spinner } from 'react-bootstrap';
import useUpcomingMoviesQuery from '../../../../hooks/useUpcomingMovies';
import MovieSlider from '../../../../common/MovieSlider/MovieSlider';
import responsive from '../../../../constants/responsive';

const UpcomingMovieSlide = () => {
  const { data, isLoading, isError, error } = useUpcomingMoviesQuery();

  if (isLoading) {
    return <Spinner animation='border' variant='primary' />;
  }

  if (isError) {
    return <Alert variant='danger'>Error: {error.message}</Alert>;
  }

  return (
    <div>
      <MovieSlider title='개봉 예정 영화' movies={data.results} responsive={responsive} />
    </div>
  );
};

export default UpcomingMovieSlide;
