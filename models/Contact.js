const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ContactSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'user', required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
  type: { type: String, default: 'personel' },
  date: { type: Date, default: Date.now }
});

const Contact = mongoose.model('contact', ContactSchema);

module.exports = Contact;
