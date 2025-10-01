const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  year: {
    type: Number,
    required: true
  },
  posterUrl: {
    type: String,
    required: true
  },
  streamingUrl: {
    type: String,
    required: true
  },
  category: {
    type: String,
    enum: ['Trending', 'Action', 'Comedy', 'Documentaries', 'Classics', 'Horror', 'Sci-fi'],
    required: true
  },
  duration: {
    type: String,
    default: '1h 30m'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Movie', movieSchema);