const express = require('express');
const router = express.Router();

// @route GET api/contacts
// @desc Get all contacts
// @access Private
router.get('/', (req, res) => {
  res.status(200).json({ message: 'List of all contacts' });
});

// @route POST api/contacts
// @desc Add a new contact
// @access Private
router.post('/', (req, res) => {
  res.status(200).json({ message: 'New contact is added' });
});

// @route PUT api/contacts/:id
// @desc Update contact details
// @access Private
router.put('/:id', (req, res) => {
  res.status(200).json({ message: 'Contact record is updated' });
});

// @route DELETE api/contacts
// @desc Delete contact
// @access Private
router.delete('/:id', (req, res) => {
  res.status(200).json({ message: 'Contact record is deleted' });
});

module.exports = router;
