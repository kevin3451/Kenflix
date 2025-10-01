import React, { useState, useEffect, useContext } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import { getMovies, getContinueWatching } from '../services/api';
import MovieCard from '../components/MovieCard';
import SearchBar from '../components/SearchBar';

const CATEGORIES = ['Trending', 'Action', 'Comedy', 'Documentaries', 'Classics'];

const HomeScreen = ({ navigation }) => {
  const { user } = useContext(AuthContext);
  const [movies, setMovies] = useState({});
  const [continueWatching, setContinueWatching] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
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

  const renderMovieList = (category) => {
    return (
      <View style={styles.categoryContainer} key={category}>
        <Text style={styles.categoryTitle}>{category}</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {movies[category]?.map(movie => (
            <MovieCard 
              key={movie._id} 
              movie={movie} 
              onPress={() => navigation.navigate('MovieDetail', { id: movie._id })}
            />
          ))}
        </ScrollView>
      </View>
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.appTitle}>Kenflix</Text>
        <SearchBar onSearch={handleSearch} value={searchQuery} />
      </View>

      {continueWatching.length > 0 && (
        <View style={styles.categoryContainer}>
          <Text style={styles.categoryTitle}>Continue Watching</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {continueWatching.map(movie => (
              <MovieCard 
                key={movie._id} 
                movie={movie} 
                isContinueWatching={true}
                onPress={() => navigation.navigate('MovieDetail', { id: movie._id })}
              />
            ))}
          </ScrollView>
        </View>
      )}

      {selectedCategory ? (
        renderMovieList(selectedCategory)
      ) : (
        CATEGORIES.map(category => renderMovieList(category))
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#141414',
    padding: 15,
  },
  header: {
    marginBottom: 20,
  },
  appTitle: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  categoryContainer: {
    marginBottom: 25,
  },
  categoryTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
});

export default HomeScreen;