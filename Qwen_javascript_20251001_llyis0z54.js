import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { getMovies, getContinueWatching } from '../services/api';
import MovieCard from '../components/MovieCard';
import SearchBar from '../components/SearchBar';
import './HomePage.css';

const CATEGORIES = ['Trending', 'Action', 'Comedy', 'Documentaries', 'Classics'];

const HomePage = () => {
  const { user } = useContext(AuthContext);
  const [movies, setMovies] = useState({});
  const [continueWatching, setContinueWatching] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    // Fetch movies for each category
    const fetchMovies = async () => {
      const moviesData = {};
      for (const category of CATEGORIES) {
        try {
          const response = await getMovies({ category });
          moviesData[category] = response.data;
        } catch (error) {
          console.error(`Error fetching ${category} movies:`, error);
        }
      }
      setMovies(moviesData);
    };

    fetchMovies();
  }, []);

  useEffect(() => {
    // Fetch continue watching if user is logged in
    if (user && !user.isGuest) {
      getContinueWatching()
        .then(response => setContinueWatching(response.data))
        .catch(error => console.error('Error fetching continue watching:', error));
    }
  }, [user]);

  const handleSearch = async (query) => {
    setSearchQuery(query);
    if (query) {
      try {
        const response = await getMovies({ search: query });
        setMovies({ Search: response.data });
        setSelectedCategory('Search');
      } catch (error) {
        console.error('Error searching movies:', error);
      }
    } else {
      setSelectedCategory('');
    }
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setSearchQuery('');
  };

  return (
    <div className="home-page">
      <div className="header">
        <h1>Kenflix</h1>
        <SearchBar onSearch={handleSearch} />
      </div>

      {continueWatching.length > 0 && (
        <section className="continue-watching">
          <h2>Continue Watching</h2>
          <div className="movies-grid">
            {continueWatching.map(movie => (
              <MovieCard 
                key={movie._id} 
                movie={movie} 
                isContinueWatching={true} 
              />
            ))}
          </div>
        </section>
      )}

      <div className="categories">
        {CATEGORIES.map(category => (
          <button
            key={category}
            className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
            onClick={() => handleCategorySelect(category)}
          >
            {category}
          </button>
        ))}
      </div>

      {selectedCategory ? (
        <section>
          <h2>{selectedCategory}</h2>
          <div className="movies-grid">
            {movies[selectedCategory]?.map(movie => (
              <MovieCard key={movie._id} movie={movie} />
            ))}
          </div>
        </section>
      ) : (
        CATEGORIES.map(category => (
          <section key={category}>
            <h2>{category}</h2>
            <div className="movies-grid">
              {movies[category]?.map(movie => (
                <MovieCard key={movie._id} movie={movie} />
              ))}
            </div>
          </section>
        ))
      )}
    </div>
  );
};

export default HomePage;