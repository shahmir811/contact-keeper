const express = require('express');
const { check } = require('express-validator');
const router = express.Router();

const auth = require('../middleware/auth');
const AuthController = require('../controllers/AuthController');

// @route GET api/auth
// @desc Get logged in user
// @access Private
router.get('/', auth, AuthController.check_me);

// @route POST api/auth
// @desc Authenticate user and return with token
// @access Public
router.post(
  '/',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists()
  ],
  AuthController.login_user
);

module.exports = router;
