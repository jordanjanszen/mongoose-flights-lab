// --> /models/flight.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;


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
}, {
    timestamps: true,
});

// To compile the schema into a model and then export:
module.exports = mongoose.model('Flight', flightSchema);