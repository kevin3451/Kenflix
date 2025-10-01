import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Movies
export const getMovies = (params = {}) => 
  axios.get(`${API_BASE_URL}/movies`, { params });

export const getMovieById = (id) => 
  axios.get(`${API_BASE_URL}/movies/${id}`);

export const getContinueWatching = () => 
  axios.get(`${API_BASE_URL}/watch-history`);

export const updateWatchHistory = (movieId, progress) => 
  axios.post(`${API_BASE_URL}/watch-history`, { movieId, progress });