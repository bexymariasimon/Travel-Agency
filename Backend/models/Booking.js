
const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },

    phone: {
        type: String,
        required: true
    },

    destination: {
        type: String,
        required: true
    },

    travelDate: {
        type: Date,
        required: true
    },

    travellers: {
        type: Number,
        required: true,
        min: 1
    }

}, { timestamps: true });

module.exports = mongoose.model("Booking", bookingSchema);
