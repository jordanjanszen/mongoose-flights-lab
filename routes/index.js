// --> /routes/index.js

const express = require('express');
const router = express.Router();
const flightsRouter = require('./flights'); // Adjust the path based on your file structure

router.get('/', (req, res, next) => {
  res.render('index', { title: 'Mongoose Flights Lab' });
});

router.use('/flights', flightsRouter); // Use the flightsRouter for /flights route

module.exports = router;