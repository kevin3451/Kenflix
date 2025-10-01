const express = require('express');
const router = express.Router();
const { signup, login, guestLogin } = require('../controllers/authController');

router.post('/signup', signup);
router.post('/login', login);
router.post('/guest', guestLogin);

module.exports = router;