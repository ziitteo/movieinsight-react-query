import React, { useEffect, useState } from 'react';
import { Alert, Col, Container, Row, Spinner } from 'react-bootstrap';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { useSearchParams } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import useSearchMovieQuery from '../../hooks/useSearchMovie';
import MovieCard from '../../common/MovieCard/MovieCard';
import useMovieGenreQuery from '../../hooks/useMovieGenre';
import './MoviePage.style.css';

const MoviePage = () => {
  const selectList = ['인기 많은순', '인기 적은순', '최신순', '가나다순'];

  const [query, setQuery] = useSearchParams();
  const [page, setPage] = useState(1); // 페이지 상태 관리
  const [selectedGenre, setSelectedGenre] = useState('장르');
  const [selectedSort, setSelectedSort] = useState('인기 많은순');
  const [pageCount, setPageCount] = useState(0);

  const keyword = query.get('q');
  const genreId = query.get('genre'); // genre도 가져오기

  // 영화와 장르 데이터를 가져오는 커스텀 훅
  const { data, isLoading, isError, error } = useSearchMovieQuery({ keyword, page });
  const { data: genreData, isLoading: isGenreLoading, isError: isGenreError } = useMovieGenreQuery();

  const totalPages = Math.min(data?.total_pages || 1, 500);

  // 페이지 변경 핸들러
  const handlePageClick = ({ selected }) => {
    setPage(selected + 1);
  };

  // 장르 선택 시 처리
  const sortByGenre = (genreId, genreName) => {
    if (genreId === null) {
      setQuery({});
    } else {
      setQuery({ genre: genreId });
    }
    setSelectedGenre(genreName);
    setPage(1); // 장르가 변경될 때 페이지를 1로 초기화
  };

  // 정렬 선택 핸들러
  const handleSelect = event => {
    setSelectedSort(event.target.value);
    setPage(1); // 정렬 방식이 변경될 때 페이지를 1로 초기화
  };

  // 장르 ID가 있는 경우 필터링된 영화 목록을 사용하고, 그렇지 않으면 전체 영화 목록을 사용
  const filteredMovies = query.get('genre')
    ? data?.results?.filter(movie => movie.genre_ids.includes(parseInt(query.get('genre'), 10)))
    : data?.results;

  // 정렬 방식에 따라 영화 목록 정렬
  const sortedMovies = filteredMovies?.sort((a, b) => {
    switch (selectedSort) {
      case '인기 많은순':
        return b.popularity - a.popularity;
      case '인기 적은순':
        return a.popularity - b.popularity;
      case '최신순':
        return new Date(b.release_date) - new Date(a.release_date);
      case '가나다순':
        return a.title.localeCompare(b.title);
      default:
        return 0;
    }
  });

  // keyword나 genre가 변경될 때 page를 1로 설정하는 useEffect
  useEffect(() => {
    setPage(1); // keyword가 변경될 때 페이지를 1로 초기화
  }, [keyword, genreId]);

  // 영화 데이터를 가져올 때 페이지 카운트 계산
  useEffect(() => {
    if (query.get('genre')) {
      const filteredMovies = data?.results?.filter(movie => movie.genre_ids.includes(parseInt(query.get('genre'), 10)));
      const totalFilteredPages = filteredMovies ? Math.ceil(filteredMovies.length / 20) : 0;
      setPageCount(totalFilteredPages);
    } else {
      setPageCount(totalPages || 0);
    }
  }, [data, query, totalPages]);

  if (isLoading || isGenreLoading) {
    return <Spinner animation='border' variant='warning' className='spinner-style' />;
  }

  if (isError || isGenreError) {
    return <Alert variant='danger'>Error: {error?.message || '장르 데이터를 가져오는 중 오류가 발생했습니다.'}</Alert>;
  }

  // 검색어에 따라 메시지를 설정
  const noMoviesMessage = keyword
    ? `'${keyword}' 키워드로 검색할 수 있는 영화가 없습니다`
    : `'${selectedGenre}'와 일치하는 영화가 없습니다`;

  return (
    <Container className='section'>
      <Row>
        <Col lg={12} className='filter-container'>
          <DropdownButton id='dropdown-basic-button' title={selectedGenre}>
            <Dropdown.Item onClick={() => sortByGenre(null, '장르')}>전체</Dropdown.Item>
            {genreData?.map(genre => (
              <Dropdown.Item key={genre.id} onClick={() => sortByGenre(genre.id, genre.name)}>
                {genre.name}
              </Dropdown.Item>
            ))}
          </DropdownButton>
        </Col>
        <Col lg={12}>
          <div className='side-filter'>
            <div className='custom-select'>
              <div className='title'>{selectedSort}</div>
              <div className='append-icon'>
                <svg
                  data-v-1cdd826e=''
                  xmlns='http://www.w3.org/2000/svg'
                  width='16'
                  height='16'
                  viewBox='0 0 16 16'
                  fill='none'
                >
                  <path d='M13 6.5L8 11.5L3 6.5' stroke='#A5A5A5' stroke-linecap='round' stroke-linejoin='round'></path>
                </svg>
              </div>
              <select aria-label='Default select example' onChange={handleSelect} value={selectedSort}>
                {selectList.map((selectItem, index) => (
                  <option key={index} value={selectItem}>
                    {selectItem}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </Col>
      </Row>
      <Row>
        <Col lg={12}>
          {sortedMovies?.length > 0 ? (
            <Row>
              {sortedMovies?.map((movie, index) => (
                <Col key={index} lg={3}>
                  <MovieCard movie={movie} />
                </Col>
              ))}
            </Row>
          ) : (
            <Alert variant='warning'>{noMoviesMessage}</Alert>
          )}
        </Col>
        <ReactPaginate
          nextLabel='>'
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          marginPagesDisplayed={2}
          pageCount={pageCount} // 필터링된 결과에 따른 전체 페이지 수
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
