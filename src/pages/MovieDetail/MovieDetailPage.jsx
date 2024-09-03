import React, { useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { Alert, Badge, Button, Spinner } from 'react-bootstrap';
import useMovieDetailQuery from '../../hooks/useMovieDetail';
import useMovieVideoQuery from '../../hooks/useMovieVideo';
import TrailerVideoModal from './components/TrailerVideoModal/TrailerVideoModal';
import DetailViewContent from './components/DetailViewContent/DetailViewContent';
import RecommendContent from './components/RecommendContent/RecommendContent';
import ReviewContent from './components/ReviewContent/ReviewContent';
import './MovieDetailPage.style.css';

const MovieDetailPage = () => {
  const menuList = ['상세정보', '추천', '리뷰'];

  const [modalShow, setModalShow] = useState(false);
  const [activeMenu, setActiveMenu] = useState('상세정보');

  const { id } = useParams(); // 라우트에서 movie_id를 받아옵니다.
  const { data, isLoading, isError, error } = useMovieDetailQuery(id);
  const { data: videoData } = useMovieVideoQuery(id);

  const detailViewRef = useRef(null);

  const handleMenuSelect = event => {
    setActiveMenu(event.currentTarget.textContent); // 텍스트를 정확히 가져오도록 수정
  };

  const handleShowMore = () => {
    detailViewRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const trailerKey = videoData?.results?.[0]?.key;

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
              <Badge key={genre.id} bg='warning' text='dark' className='movie-genre'>
                {genre.name}
              </Badge>
            ))}
          </div>

          <div className='play-button'>
            <Button variant='danger' onClick={() => setModalShow(true)}>
              예고편 보기<span className='btn-play'> ▶</span>
            </Button>
            <TrailerVideoModal show={modalShow} onHide={() => setModalShow(false)} movieID={trailerKey} />
          </div>
          <p className='overview'>
            {data.overview.length < 100 ? data.overview : `${data.overview.slice(0, 100)}...`}
            {data.overview.length > 100 && (
              <Button variant='link' className='show-more-button' onClick={handleShowMore}>
                더보기
              </Button>
            )}
          </p>
        </div>
      </div>
      <div className='bottom-contents'>
        <div className='content-nav'>
          <ul>
            {menuList.map(menu => (
              <li key={menu}>
                <button type='button' onClick={handleMenuSelect} className={activeMenu === menu ? 'on' : ''}>
                  {menu}
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className='movie-detail-info-container'>
          {activeMenu === '상세정보' && <DetailViewContent data={data} ref={detailViewRef} />}
          {activeMenu === '추천' && <RecommendContent />}
          {activeMenu === '리뷰' && <ReviewContent />}
        </div>
      </div>
    </div>
  );
};

export default MovieDetailPage;
