import React from 'react';
import Banner from './components/Banner/Banner';
import PopularMovieSlide from './components/PopularMovieSlide/PopularMovieSlide';
import TopRatedMovieSlide from './components/TopRatedMovieSlide/TopRatedMovieSlide';
import UpcomingMovieSlide from './components/UpcomingMovieSlide/UpcomingMovieSlide';

// 1. 배너 => now playing 영화 슬라이드로 보여주기
// 2. popular 영화
// 3. top rated 영화
// 4. upcoming 영화
const HomePage = () => {
  return (
    <div className='section'>
      <Banner />
      <PopularMovieSlide />
      <TopRatedMovieSlide />
      <UpcomingMovieSlide />
    </div>
  );
};

export default HomePage;
