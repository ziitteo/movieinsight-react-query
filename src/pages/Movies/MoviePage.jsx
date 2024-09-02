import React, { useState } from 'react';
import { Alert, Col, Container, Row, Spinner } from 'react-bootstrap';
import { useSearchParams } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import useSearchMovieQuery from '../../hooks/useSearchMovie';
import MovieCard from '../../common/MovieCard/MovieCard';
import './MoviePage.style.css';

// 경로 2가지
// nav바에서 클릭해서 온 경우 => popular 영화 보여주기
// keyword 검색해서 온 경우 => keyword와 관련된 영화들을 보여줌

// 페이지네이션 설치
// page state 만들기
// 페이지네이션 클릭할 때마다 page 바꿔주기
// page가 바뀔 때마다 useSearchMovieQuery에 page까지 넣어서 fetch

const MoviePage = () => {
  // eslint-disable-next-line no-unused-vars
  const [query, setQuery] = useSearchParams();
  const [page, setPage] = useState(1);
  const keyword = query.get('q');

  const { data, isLoading, isError, error } = useSearchMovieQuery({ keyword, page });

  const handlePageClick = ({ selected }) => {
    setPage(selected + 1);
  };

  if (isLoading) {
    return <Spinner animation='border' variant='primary' className='spinner-style' />;
  }

  if (isError) {
    return <Alert variant='danger'>Error: {error.message}</Alert>;
  }

  return (
    <Container className='section'>
      <Row>
        <Col lg={12}>필터</Col>
      </Row>
      <Row>
        <Col lg={12}>
          <Row>
            {data?.results.map((movie, index) => (
              <Col key={index} lg={3}>
                <MovieCard movie={movie} />
              </Col>
            ))}
          </Row>
        </Col>
        <ReactPaginate
          nextLabel='>'
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          marginPagesDisplayed={2}
          pageCount={data?.total_pages} // 전체 페이지 수
          previousLabel='<'
          pageClassName='page-item'
          pageLinkClassName='page-link'
          previousClassName='page-item'
          previousLinkClassName='page-link'
          nextClassName='page-item'
          nextLinkClassName='page-link'
          breakLabel='...'
          breakClassName='page-item'
          breakLinkClassName='page-link'
          containerClassName='pagination'
          activeClassName='active'
          renderOnZeroPageCount={null}
          forcePage={page - 1}
        />
      </Row>
    </Container>
  );
};

export default MoviePage;
