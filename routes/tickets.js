const express = require('express');
const router = express.Router();
const ticketsController = require('../controllers/tickets');

// GET /flights/:id/tickets/new - Show the form to create a new ticket
router.get('/flights/:id/tickets/new', ticketsController.new);

// POST /flights/:id/tickets - Handle the creation of a new ticket
router.post('/flights/:id/tickets', ticketsController.create);

module.exports = router;