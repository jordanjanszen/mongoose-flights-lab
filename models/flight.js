// --> /models/flight.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ticketSchema = new Schema({
    seat: {
        type: String,
        match: /[A-F][1-9]\d?/,
        required: true
    },
    price: {
        type: Number,
        min: 0,
        required: true
    },
    flight: {
        type: Schema.Types.ObjectId,
        ref: 'Flight',
        required: true
    }
});

module.exports = mongoose.model('Ticket', ticketSchema);

const destinationSchema = new Schema( {
    airport: {
        type: String,
        enum: ['DXB', 'AUH', 'SYD', 'AMS', 'HKG', 'SIN', 'LAX'],
        required: true,
    },
    arrival: {
        type: Date,
        required: true,
    },
});

module.exports = mongoose.model('Destination', destinationSchema);


const flightSchema = new Schema({
    airline: {
        type: String,
        enum: ['Emirates', 'Etihad', 'Singapore', 'Cathay Pacific', 'Turskish', 'KLM', 'Qantas'],
        required: true,
    },
    airport: {
        type: String,
        enum: ['DXB', 'AUH', 'SYD', 'AMS', 'HKG', 'SIN', 'LAX'],
    },
    flightNo: {
        type: Number,
        validate: {
            validator: function (value) {
                return value >= 10 && value <=9999;
            },
            message: 'Flight number must be between 10 and 9999',
        },
    },
    departs: {
        type: Date,
        default: () => new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
    },
    destinations: {
        type: [destinationSchema], // Array of destination subdocuments
        default: [],
      },
    tickets: [{
        type: Schema.Types.ObjectId,
        ref: 'Ticket',
    }],
}, {
    timestamps: true,
});

// To compile the schema into a model and then export:
module.exports = mongoose.model('Flight', flightSchema);