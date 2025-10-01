import React, { useState, useContext } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import { getMovieById, updateWatchHistory } from '../services/api';
import VideoPlayer from '../components/VideoPlayer';

const { width, height } = Dimensions.get('window');

const MovieDetailScreen = ({ route, navigation }) => {
  const { id } = route.params;
  const { user } = useContext(AuthContext);
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showPlayer, setShowPlayer] = useState(false);

  React.useEffect(() => {
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
      navigation.navigate('Login');
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

  if (loading) {
    return (
      <View style={styles.center}>
        <Text style={styles.loading}>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.error}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {!showPlayer ? (
        <View style={styles.movieInfo}>
          <Image 
            source={{ uri: movie.posterUrl }} 
            style={styles.poster} 
            resizeMode="cover"
          />
          <View style={styles.details}>
            <Text style={styles.title}>{movie.title} ({movie.year})</Text>
            <Text style={styles.description}>{movie.description}</Text>
            <TouchableOpacity style={styles.playButton} onPress={handlePlay}>
              <Text style={styles.playButtonText}>▶ Play</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View style={styles.videoContainer}>
          <VideoPlayer 
            source={movie.streamingUrl} 
            onProgress={handleProgress}
            onEnd={handleEnded}
          />
          <TouchableOpacity 
            style={styles.backButton} 
            onPress={() => setShowPlayer(false)}
          >
            <Text style={styles.backButtonText}>Back to Details</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#141414',
  },
  loading: {
    color: '#fff',
    fontSize: 18,
  },
  error: {
    color: '#e50914',
    fontSize: 18,
  },
  movieInfo: {
    flex: 1,
    backgroundColor: '#141414',
    padding: 20,
  },
  poster: {
    width: width - 40,
    height: height * 0.5,
    borderRadius: 10,
    marginBottom: 20,
  },
  details: {
    flex: 1,
  },
  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  description: {
    color: '#aaa',
    fontSize: 16,
    marginBottom: 20,
    lineHeight: 24,
  },
  playButton: {
    backgroundColor: '#e50914',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 5,
    alignSelf: 'flex-start',
  },
  playButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  videoContainer: {
    flex: 1,
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    backgroundColor: 'rgba(0,0,0,0.7)',
    padding: 10,
    borderRadius: 5,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default MovieDetailScreen;