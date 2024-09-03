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

// 경로 2가지
// nav바에서 클릭해서 온 경우 => popular 영화 보여주기
// keyword 검색해서 온 경우 => keyword와 관련된 영화들을 보여줌

// 페이지네이션 설치
// page state 만들기
// 페이지네이션 클릭할 때마다 page 바꿔주기
// page가 바뀔 때마다 useSearchMovieQuery에 page까지 넣어서 fetch

const MoviePage = () => {
  const selectList = ['인기 많은순', '인기 적은순', '최신순', '가나다순'];

  const [query, setQuery] = useSearchParams();
  const [page, setPage] = useState(1);
  const [selectedGenre, setSelectedGenre] = useState('장르');
  const [selectedSort, setSelectedSort] = useState('인기 많은순');
  const [pageCount, setPageCount] = useState(0);

  const keyword = query.get('q');

  const { data, isLoading, isError, error } = useSearchMovieQuery({ keyword, page });
  const { data: genreData, isLoading: isGenreLoading, isError: isGenreError } = useMovieGenreQuery();

  const handlePageClick = ({ selected }) => {
    setPage(selected + 1);
  };

  const sortByGenre = (genreId, genreName) => {
    if (genreId === null) {
      setQuery({});
    } else {
      setQuery({ genre: genreId });
    }
    setSelectedGenre(genreName);
    setPage(1); // 장르가 바뀔 때 페이지를 초기화
  };

  const handleSelect = event => {
    setSelectedSort(event.target.value);
  };

  // 장르 ID가 있는 경우 필터링된 영화 목록을 사용하고, 그렇지 않으면 전체 영화 목록을 사용
  const filteredMovies = query.get('genre')
    ? data?.results?.filter(movie => movie.genre_ids.includes(parseInt(query.get('genre'), 10)))
    : data?.results;

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

  useEffect(() => {
    if (query.get('genre')) {
      const filteredMovies = data?.results?.filter(movie => movie.genre_ids.includes(parseInt(query.get('genre'), 10)));
      const totalFilteredPages = filteredMovies ? Math.ceil(filteredMovies.length / 20) : 0;
      setPageCount(totalFilteredPages);
    } else {
      setPageCount(data?.total_pages || 0);
    }
  }, [data, query]);

  if (isLoading || isGenreLoading) {
    return <Spinner animation='border' variant='warning' className='spinner-style' />;
  }

  if (isError || isGenreError) {
    return <Alert variant='danger'>Error: {error?.message || '장르 데이터를 가져오는 중 오류가 발생했습니다.'}</Alert>;
  }

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
              <div className='title'>인기 많은순</div>
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
            <Alert variant='warning'>"{selectedGenre}" 와 일치하는 영화가 없습니다.</Alert>
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
