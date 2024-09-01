import React from 'react';
import { Badge } from 'react-bootstrap';
import './MovieCard.style.css';

const MovieCard = ({ movie }) => {
  return (
    <div
      style={{
        backgroundImage: `url(https://media.themoviedb.org/t/p/w600_and_h900_bestv2/${movie.poster_path})`,
      }}
      className='movie-card'
    >
      <div className='overlay'>
        <h1>{movie.title}</h1>
        {movie.genre_ids.map(id => (
          <Badge bg='warning' text='dark' className='movie-genre'>
            {id}
          </Badge>
        ))}
        <div className='movie-info'>
          <div>{movie.vote_average}</div>
          <div>{movie.popularity}</div>
          <div>{movie.adult ? '19' : 'ALL'}</div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
