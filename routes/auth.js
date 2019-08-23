const express = require('express');
const router = express.Router();

// @route GET api/auth
// @desc Get logged in user
// @access Private
router.get('/', (req, res) => {
  res.status(200).json({ message: 'Username is Shahzaib' });
});

// @route POST api/auth
// @desc Authenticate user and return with token
// @access Public
router.post('/', (req, res) => {
  res.status(200).json({ message: 'User is successfully logged in' });
});

module.exports = router;
