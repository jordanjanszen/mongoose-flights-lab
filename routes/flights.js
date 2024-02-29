// --> /routes/flights.js

var express = require('express');
var router = express.Router();
var flightsController = require('../controllers/flights');
const Flight = require('../models/flight');
  
// GET /flights/new
router.get('/new', flightsController.new);
// POST /flights
router.post('/', flightsController.create);

router.get('/', async (req, res, next) => {
    try {
      const flights = await Flight.find(); // Fetch flights from the database
      res.render('flights/index', { title: 'List of Flights', flights });
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  });
  

module.exports = router;
