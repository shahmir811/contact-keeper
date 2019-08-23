const express = require('express');
const router = express.Router();

// @route POST api/users
// @desc Register a new user
// @access Public
router.post('/', (req, res) => {
  res.status(201).json({ message: 'New user created' });
});

// @route POST api/users
// @desc Register a new user
// @access Public

// @route POST api/users
// @desc Register a new user
// @access Public

// @route POST api/users
// @desc Register a new user
// @access Public

module.exports = router;
