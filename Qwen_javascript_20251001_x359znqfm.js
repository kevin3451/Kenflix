import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [movies, setMovies] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    year: '',
    posterUrl: '',
    streamingUrl: '',
    category: 'Trending'
  });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      const res = await axios.get('/api/movies');
      setMovies(res.data);
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      if (editingId) {
        await axios.put(`/api/movies/${editingId}`, formData);
        setEditingId(null);
      } else {
        await axios.post('/api/movies', formData);
      }
      
      fetchMovies();
      setFormData({
        title: '',
        description: '',
        year: '',
        posterUrl: '',
        streamingUrl: '',
        category: 'Trending'
      });
    } catch (error) {
      console.error('Error saving movie:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (movie) => {
    setFormData({
      title: movie.title,
      description: movie.description,
      year: movie.year.toString(),
      posterUrl: movie.posterUrl,
      streamingUrl: movie.streamingUrl,
      category: movie.category
    });
    setEditingId(movie._id);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this movie?')) {
      try {
        await axios.delete(`/api/movies/${id}`);
        fetchMovies();
      } catch (error) {
        console.error('Error deleting movie:', error);
      }
    }
  };

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      
      <form onSubmit={handleSubmit} className="movie-form">
        <h2>{editingId ? 'Edit Movie' : 'Add New Movie'}</h2>
        <div className="form-group">
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Description:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Year:</label>
          <input
            type="number"
            name="year"
            value={formData.year}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Poster URL:</label>
          <input
            type="url"
            name="posterUrl"
            value={formData.posterUrl}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Streaming URL:</label>
          <input
            type="url"
            name="streamingUrl"
            value={formData.streamingUrl}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Category:</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
          >
            <option value="Trending">Trending</option>
            <option value="Action">Action</option>
            <option value="Comedy">Comedy</option>
            <option value="Documentaries">Documentaries</option>
            <option value="Classics">Classics</option>
            <option value="Horror">Horror</option>
            <option value="Sci-fi">Sci-fi</option>
          </select>
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Saving...' : editingId ? 'Update Movie' : 'Add Movie'}
        </button>
        {editingId && (
          <button 
            type="button" 
            onClick={() => {
              setEditingId(null);
              setFormData({
                title: '',
                description: '',
                year: '',
                posterUrl: '',
                streamingUrl: '',
                category: 'Trending'
              });
            }}
          >
            Cancel Edit
          </button>
        )}
      </form>

      <div className="movies-list">
        <h2>Existing Movies</h2>
        <table>
          <thead>
            <tr>
              <th>Poster</th>
              <th>Title</th>
              <th>Year</th>
              <th>Category</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {movies.map(movie => (
              <tr key={movie._id}>
                <td>
                  <img src={movie.posterUrl} alt={movie.title} width="50" />
                </td>
                <td>{movie.title}</td>
                <td>{movie.year}</td>
                <td>{movie.category}</td>
                <td>
                  <button onClick={() => handleEdit(movie)}>Edit</button>
                  <button onClick={() => handleDelete(movie._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;