import React from 'react';
import { Badge } from 'react-bootstrap';
import './MovieCard.style.css';
import useMovieGenreQuery from '../../hooks/useMovieGenre';

const MovieCard = ({ movie }) => {
  const { data: genreData } = useMovieGenreQuery();

  const showGenre = genreIdList => {
    if (!genreData) return [];
    const genreNameList = genreIdList.map(id => {
      const genreObj = genreData.find(genre => genre.id === id);
      return genreObj.name;
    });

    return genreNameList;
  };

  return (
    <div
      style={{
        backgroundImage: `url(https://media.themoviedb.org/t/p/w600_and_h900_bestv2/${movie.poster_path})`,
      }}
      className='movie-card'
    >
      <div className='overlay'>
        <h1>{movie.title}</h1>
        {showGenre(movie.genre_ids).map(id => (
          <Badge bg='warning' text='dark' className='movie-genre'>
            {id}
          </Badge>
        ))}
        <div className='movie-info'>
          <div className='movie-info2'>
            <div>{movie.vote_average}</div>
            <div>{movie.popularity}</div>
          </div>
          <div className={`movie-age ${movie.adult ? 'adult' : 'all'}`}></div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
