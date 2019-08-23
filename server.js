const express = require('express');
const morgan = require('morgan');

const UserRoutes = require('./routes/users');
const AuthRoutes = require('./routes/auth');
const ContactRoutes = require('./routes/contacts');

const app = express();

// Used below code to log request
app.use(morgan('dev'));

// All application routes
app.use('/api/auth', AuthRoutes);
app.use('/api/contacts', ContactRoutes);
app.use('/api/users', UserRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, (req, res) =>
  console.log(`Server is running at port ${PORT}`)
);
