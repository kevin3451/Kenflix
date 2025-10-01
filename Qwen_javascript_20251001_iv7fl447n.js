import React from 'react';
import { Link } from 'react-router-dom';
import './MovieCard.css';

const MovieCard = ({ movie, isContinueWatching = false }) => {
  return (
    <Link to={`/movie/${movie._id}`} className="movie-card">
      <div className="movie-poster">
        <img src={movie.posterUrl} alt={movie.title} />
        {isContinueWatching && (
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${movie.progress}%` }}
            ></div>
          </div>
        )}
      </div>
      <h3 className="movie-title">{movie.title}</h3>
      <p className="movie-year">{movie.year}</p>
    </Link>
  );
};

export default MovieCard;