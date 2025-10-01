import React, { useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { getMovieById, updateWatchHistory } from '../services/api';
import VideoPlayer from '../components/VideoPlayer';
import './MovieDetailPage.css';

const MovieDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showPlayer, setShowPlayer] = useState(false);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await getMovieById(id);
        setMovie(response.data);
        setLoading(false);
      } catch (err) {
        setError('Movie not found');
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id]);

  const handlePlay = () => {
    if (!user) {
      // Redirect to login if not authenticated
      navigate('/login');
      return;
    }
    setShowPlayer(true);
  };

  const handleProgress = (progress) => {
    if (user && !user.isGuest) {
      updateWatchHistory(id, progress);
    }
  };

  const handleEnded = () => {
    if (user && !user.isGuest) {
      updateWatchHistory(id, 100);
    }
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="movie-detail">
      {!showPlayer ? (
        <div className="movie-info">
          <div className="poster-container">
            <img src={movie.posterUrl} alt={movie.title} />
          </div>
          <div className="details">
            <h1>{movie.title} ({movie.year})</h1>
            <p className="description">{movie.description}</p>
            <button className="play-btn" onClick={handlePlay}>
              ▶ Play
            </button>
          </div>
        </div>
      ) : (
        <div className="video-container">
          <VideoPlayer 
            src={movie.streamingUrl} 
            onProgress={handleProgress}
            onEnded={handleEnded}
          />
          <button className="back-btn" onClick={() => setShowPlayer(false)}>
            Back to Details
          </button>
        </div>
      )}
    </div>
  );
};

export default MovieDetailPage;