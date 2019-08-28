const express = require('express');
const router = express.Router();
const { check } = require('express-validator');

const auth = require('../middleware/auth');

const ContactsController = require('../controllers/ContactsController');

// @route GET api/contacts
// @desc Get all contacts
// @access Private
router.get('/', auth, ContactsController.contacts_all);

// @route POST api/contacts
// @desc Add a new contact
// @access Private
router.post(
  '/',
  [
    auth,
    [
      check('name', 'Please add name')
        .not()
        .isEmpty()
    ]
  ],
  ContactsController.add_new_contact
);

// @route PUT api/contacts/:id
// @desc Update contact details
// @access Private
router.put(
  '/:id',
  [
    auth,
    [
      check('name', 'Please add name')
        .not()
        .isEmpty()
    ]
  ],
  ContactsController.update_contact
);

// @route DELETE api/contacts
// @desc Delete contact
// @access Private
router.delete('/:id', auth, ContactsController.delete_contact);

module.exports = router;
