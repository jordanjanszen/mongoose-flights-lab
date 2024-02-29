// --> /controllers/flights.js
const Flight = require('../models/flight.js');

module.exports = {
    new: newFlight,
    create,
};

function newFlight (req, res) {
// Render an error message if the 'create action' fails
    res.render('flights/new', { 
        errorMsg: '',
        title: 'Add New Flight'});
};


async function create (req, res) {
    try {
        const { airline, airport, flightNo, departs } = req.body;

        const newFlight = new Flight({
            airline,
            airport,
            flightNo,
            departs,
        });
        await newFlight.save();
        res.rediect('/flights'); // Redirect to flights list after successful submission
    } catch (error) {
        res.render('flghts/new', {errorMsg: 'Error adding flight. Please try again.'});
    }
};
