const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

const auth = require('../middleware/auth');
const Contact = require('../models/Contact');
const User = require('../models/User');

// @route GET api/contacts
// @desc Get all contacts
// @access Private
router.get('/', auth, async (req, res) => {
  try {
    const contacts = await Contact.find({ user: req.user.id }).sort({
      date: -1
    }); // most recent contacts first

    res.status(200).json(contacts);
  } catch (error) {
    serverError(error, res);
  }
});

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
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
      }

      const { name, email, phone, type } = req.body;

      const contact = new Contact({
        user: req.user.id,
        name,
        email,
        phone,
        type
      });

      const response = await contact.save();
      res.status(201).json(response);
    } catch (error) {
      serverError(error, res);
    }
  }
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
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
      }

      const { id } = req.params;
      const { name, email, phone, type } = req.body;

      const contact = await Contact.findById(id);
      if (!contact) {
        return res.status(404).json({ message: 'Contact not found' });
      }

      if (contact.user.toString() !== req.user.id) {
        return res
          .status(401)
          .json({ message: 'Not authorized to make changes' });
      }

      const contactFeilds = {};
      if (name) contactFeilds.name = name;
      if (email) contactFeilds.email = email;
      if (phone) contactFeilds.phone = phone;
      if (type) contactFeilds.type = type;

      const response = await Contact.findByIdAndUpdate(id, {
        $set: contactFeilds,
        new: true // means if this contact does't exist then create new
      });

      res.status(200).json(response);
    } catch (error) {
      serverError(error, res);
    }
  }
);

// @route DELETE api/contacts
// @desc Delete contact
// @access Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const { id } = req.params;

    const contact = await Contact.findById(id);
    if (!contact) return res.status(404).json({ message: 'Contact not found' });

    if (contact.user.toString() !== req.user.id) {
      return res
        .status(401)
        .json({ message: 'Not authorized to delete this contact' });
    }

    await Contact.findByIdAndRemove(id);

    res.status(200).json({ message: 'Contact removed' });
  } catch (error) {
    serverError(error, res);
  }
});

const serverError = (error, res) => {
  console.log(error.message);
  return res.status(500).json('Server error');
};

module.exports = router;
