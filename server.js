const express = require('express');
const morgan = require('morgan');

const UserRoutes = require('./routes/users');
const AuthRoutes = require('./routes/auth');
const ContactRoutes = require('./routes/contacts');
const connectDB = require('./config/db');

const app = express();
connectDB();

// Used below code to log request
app.use(morgan('dev'));
app.use(express.json({ extended: false })); // body-Parser. By default included in express.js

// All application routes
app.use('/api/auth', AuthRoutes);
app.use('/api/contacts', ContactRoutes);
app.use('/api/users', UserRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, (req, res) =>
  console.log(`Server is running at port ${PORT}`)
);
