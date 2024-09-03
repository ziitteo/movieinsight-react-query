import React, { forwardRef } from 'react';
import { useParams } from 'react-router-dom';
import { Alert, Spinner } from 'react-bootstrap';
import useMovieCreditsQuery from '../../../../hooks/useMovieCredits';
import './DetailViewContent.style.css';

const DetailViewContent = forwardRef(({ data }, ref) => {
  const { id } = useParams(); // 라우트에서 movie_id를 받아옵니다.

  const { data: creditsData, isLoading, isError, error } = useMovieCreditsQuery(id);

  // cast와 director 데이터를 안전하게 가져오기
  const castList =
    creditsData?.cast
      ?.slice(0, 10)
      .map(castMember => castMember.name)
      .join(', ') || '정보 없음';

  const director = creditsData?.crew?.find(member => member.known_for_department === 'Directing')?.name || '정보 없음';

  if (isLoading) {
    return <Spinner animation='border' variant='warning' />;
  }

  if (isError) {
    return <Alert variant='danger'>Error: {error.message}</Alert>;
  }

  return (
    <div className='detail-view-content-area' ref={ref}>
      <div className='poster-box'>
        <img src={`https://www.themoviedb.org/t/p/w300_and_h450_bestv2/${data.poster_path}`} alt={data.title} />
      </div>
      <div className='detail-info-box'>
        <em className='preview-title'>{data.title}</em>
        <p className='detail-desc'>{data.overview}</p>
        <table className='detail-info-table'>
          <tr>
            <th scope='row'>개봉일</th>
            <td>{data.release_date}</td>
          </tr>
          <tr>
            <th scope='row'>장르</th>
            <td>{data.genres.map(genre => genre.name).join(', ')}</td>
          </tr>
          <tr>
            <th scope='row'>출연</th>
            <td>{castList}</td>
          </tr>
          <tr>
            <th scope='row'>감독</th>
            <td>{director}</td>
          </tr>
          <tr>
            <th scope='row'>평점</th>
            <td>{data.vote_average}</td>
          </tr>
          <tr>
            <th scope='row'>인기</th>
            <td>{data.popularity}</td>
          </tr>
          <tr>
            <th scope='row'>예산</th>
            <td>
              {data.budget.toLocaleString('en-US', {
                style: 'currency',
                currency: 'USD',
              })}
            </td>
          </tr>
          <tr>
            <th scope='row'>수익</th>
            <td>
              {data.revenue.toLocaleString('en-US', {
                style: 'currency',
                currency: 'USD',
              })}
            </td>
          </tr>
          <tr>
            <th scope='row'>등급</th>
            <td>
              <span className={`movie-age detail-age ${data.adult ? 'adult' : 'all'}`}></span>
            </td>
          </tr>
        </table>
      </div>
    </div>
  );
});

export default DetailViewContent;
