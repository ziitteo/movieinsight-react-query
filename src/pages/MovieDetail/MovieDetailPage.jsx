import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Alert, Badge, Button, Spinner } from 'react-bootstrap';
import useMovieDetailQuery from '../../hooks/useMovieDetail';
import useMovieVideoQuery from '../../hooks/useMovieVideo';
import TrailerVideoModal from './components/TrailerVideoModal/TrailerVideoModal';
import './MovieDetailPage.style.css';

const MovieDetailPage = () => {
  const [modalShow, setModalShow] = useState(false);
  const { id } = useParams(); // 라우트에서 movie_id를 받아옵니다.
  const { data, isLoading, isError, error } = useMovieDetailQuery(id);
  const { data: videoData } = useMovieVideoQuery(id);
  console.log('movie', data);
  console.log('video', videoData);

  const trailerKey = videoData?.results?.[videoData.results.length - 1].key;

  if (isLoading) {
    return <Spinner animation='border' variant='warning' />;
  }

  if (isError) {
    return <Alert variant='danger'>Error: {error.message}</Alert>;
  }

  return (
    <div className='section'>
      <div className='movie-detail-banner'>
        <img
          src={`https://media.themoviedb.org/t/p/w1066_and_h600_bestv2${data.backdrop_path}`}
          alt={data.title}
          className='banner-image'
        />
        <div className='text-white banner-text-area'>
          <h1>{data.title}</h1>
          <div className='movie-detail-info'>
            <p>{data.release_date}</p>
            <p>{data.runtime}분</p>
            <div className={`movie-age detail-age ${data.adult ? 'adult' : 'all'}`}></div>
          </div>
          <div className='movie-genre'>
            {data.genres.map(genre => (
              <Badge bg='warning' text='dark' className='movie-genre'>
                {genre.name}
              </Badge>
            ))}
          </div>

          <div className='play-button'>
            <Button variant='danger' onClick={() => setModalShow(true)}>
              예고편 보기<span class='btn-play'> ▶</span>
            </Button>
            <TrailerVideoModal show={modalShow} onHide={() => setModalShow(false)} movieID={trailerKey} />
          </div>
          <p className='overview'>{data.overview}</p>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailPage;
