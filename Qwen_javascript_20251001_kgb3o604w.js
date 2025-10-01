const express = require('express');
const router = express.Router();
const { 
  updateWatchHistory, 
  getContinueWatching 
} = require('../controllers/watchHistoryController');
const { protect } = require('../middleware/authMiddleware');

router.route('/')
  .post(protect, updateWatchHistory)
  .get(protect, getContinueWatching);

module.exports = router;