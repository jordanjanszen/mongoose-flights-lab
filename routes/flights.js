// --> /routes/flights.js

var express = require('express');
var router = express.Router();
var flightsController = require('../controllers/flights');
  
// GET /flights/new
router.get('/new', flightsController.new);
// POST /flights
router.post('/', flightsController.create);


module.exports = router;
