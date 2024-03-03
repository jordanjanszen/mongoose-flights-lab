const {Ticket} = require('../models/flight');


module.exports = {
    new: (req, res) => {
        // Render the form to create a new ticket
        res.render('tickets/new', { flightId: req.params.id, title: 'New Ticket' });
    },

    create: async (req, res) => {
        try {
            const { seat, price } = req.body;
            const flightId = req.params.id;

            // Manually add the flight property before creating the ticket
            const newTicket = new Ticket({
                seat,
                price,
                flight: flightId,
            });

            await newTicket.save();

            // Redirect back to the flight's show page after creating the ticket
            res.redirect(`/flights/${flightId}`);
        } catch (error) {
            console.error(error);
            res.status(500).send('Internal Server Error');
        }
    },
};