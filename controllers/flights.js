// --> /controllers/flights.js

const Flight = require('../models/flight.js');

module.exports = {
    new: newFlight,
    create,
    show: async (req, res) => {
        try {
            const flight = await Flight.findById(req.params.id)
                .populate('destinations')
                .populate('tickets');

            res.render('flights/show', { flight, tickets: flight.tickets, title: 'Flight Details' });
        } catch (error) {
            console.error(error);
            res.status(500).send('Internal Server Error');
        }
    },
    
    addDestination: async (req, res) => {
        try {
            const flight = await Flight.findById(req.params.id);

            // Extract destination details from the request body
            const { airport, arrival } = req.body;
        
            if (!['DXB', 'AUH', 'SYD', 'AMS', 'HKG', 'SIN', 'LAX'].includes(airport)) {
                throw new Error(`Invalid value for airport: ${airport}`);
            }

            // Add the destination to the flight's destinations array
            flight.destinations.push({ airport, arrival });
            await flight.save();
    
            res.redirect(`/flights/${flight._id}`);
        } catch (error) {
            console.error(error);
            res.status(500).send('Internal Server Error');
        }
    },
};

function newFlight(req, res) {
    // Render an error message if the 'create action' fails
    res.render('flights/new', {
        errorMsg: '',
        title: 'Add New Flight'
    });
}

async function create(req, res) {
    try {
        const { airline, airport, flightNo, departs } = req.body;

        const newFlight = new Flight({
            airline,
            airport,
            flightNo,
            departs,
        });

        await newFlight.save();
        res.redirect('/flights');
    } catch (error) {
        res.render('flights/new', { errorMsg: 'Error adding flight. Please try again.' });
    }
}
