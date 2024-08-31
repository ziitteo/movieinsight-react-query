import { Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import AppLayout from './layout/AppLayout';
import Homepage from './pages/Homepage/Homepage';
import MoviePage from './pages/Movies/MoviePage';
import MovieDetailPage from './pages/MovieDetail/MovieDetailPage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';

// 홈페이지 /
// 영화 전체 보여주는 페이지 (서치) /movies?q=검색어
// 영화 상세 페이지 /movies/:id
// 추천 영화 페이지 /movies/:id/recommendation
// 리뷰 페이지 /movies/:id/review

function App() {
  return (
    <div className='App'>
      <Routes>
        {/* user 화면 */}
        <Route path='/' element={<AppLayout />}>
          <Route index element={<Homepage />} />
          <Route path='movies'>
            <Route index element={<MoviePage />} />
            <Route path=':id' element={<MovieDetailPage />} />
          </Route>
        </Route>

        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;
