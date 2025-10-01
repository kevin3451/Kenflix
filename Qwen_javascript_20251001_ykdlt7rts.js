const User = require('../models/User');
const Movie = require('../models/Movie');

exports.updateWatchHistory = async (req, res) => {
  try {
    const { movieId, progress } = req.body;
    const userId = req.user.id;
    
    // Validate movie exists
    const movie = await Movie.findById(movieId);
    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' });
    }
    
    // Update or create watch history entry
    const user = await User.findByIdAndUpdate(
      userId,
      {
        $set: {
          'watchHistory.$[elem].progress': progress,
          'watchHistory.$[elem].watchedAt': new Date()
        }
      },
      {
        arrayFilters: [{ 'elem.movieId': movieId }],
        new: true,
        upsert: true
      }
    );
    
    // If no existing entry, add new one
    if (!user.watchHistory.some(item => item.movieId.toString() === movieId)) {
      await User.findByIdAndUpdate(
        userId,
        { $push: { watchHistory: { movieId, progress } } },
        { new: true }
      );
    }
    
    res.json({ message: 'Watch history updated' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getContinueWatching = async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
      .populate('watchHistory.movieId')
      .exec();
    
    // Filter movies with progress > 0 and < 100
    const continueWatching = user.watchHistory
      .filter(item => item.progress > 0 && item.progress < 100)
      .map(item => ({
        ...item.movieId.toObject(),
        progress: item.progress
      }))
      .slice(0, 5); // Limit to 5 items
    
    res.json(continueWatching);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};