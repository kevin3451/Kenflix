import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

const MovieCard = ({ movie, onPress, isContinueWatching = false }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.posterContainer}>
        <Image 
          source={{ uri: movie.posterUrl }} 
          style={styles.poster} 
          resizeMode="cover"
        />
        {isContinueWatching && (
          <View style={styles.progressBar}>
            <View 
              style={[styles.progressFill, { width: `${movie.progress}%` }]} 
            />
          </View>
        )}
      </View>
      <Text style={styles.title} numberOfLines={1}>{movie.title}</Text>
      <Text style={styles.year}>{movie.year}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 140,
    marginRight: 15,
  },
  posterContainer: {
    position: 'relative',
  },
  poster: {
    width: '100%',
    height: 200,
    borderRadius: 8,
  },
  progressBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 4,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#e50914',
  },
  title: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 8,
  },
  year: {
    color: '#aaa',
    fontSize: 12,
  },
});

export default MovieCard;