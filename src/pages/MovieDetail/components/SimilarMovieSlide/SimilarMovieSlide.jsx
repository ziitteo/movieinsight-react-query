import React from 'react';
import { useParams } from 'react-router-dom';
import { Alert, Spinner } from 'react-bootstrap';
import useSimilarMovieQuery from '../../../../hooks/useSimilarMovie';
import MovieSlider from '../../../../common/MovieSlider/MovieSlider';
import responsive from '../../../../constants/responsive';

const SimilarMovieSlide = () => {
  const { id } = useParams(); // 라우트에서 movie_id를 받아옵니다.
  const { data, isLoading, isError, error } = useSimilarMovieQuery(id);

  if (isLoading) {
    return <Spinner animation='border' variant='warning' />;
  }

  if (isError) {
    return <Alert variant='danger'>Error: {error.message}</Alert>;
  }

  return (
    <div>
      <MovieSlider title='비슷한 영화' movies={data.results} responsive={responsive} />
    </div>
  );
};

export default SimilarMovieSlide;
