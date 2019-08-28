const express = require('express');
const router = express.Router();
const { check } = require('express-validator');

const UserController = require('../controllers/UserController');

// @route POST api/users
// @desc Register a new user
// @access Public
router.post(
  '/',
  [
    check('name', 'Please add name')
      .not()
      .isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password must be atleast 6 characters long').isLength({
      min: 6
    })
  ],
  UserController.add_new_user
);

module.exports = router;
