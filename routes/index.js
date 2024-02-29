// --> /routes/index.js

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Mongoose Flights Lab' });
});

router.get('/flights', function(req, res, next) {
  res.render('flights/index', { title: "List of Flights" });
});


module.exports = router;
