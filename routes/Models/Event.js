const mongoose = require('mongoose');
const express = require('express');

const EventSchema = new mongoose.Schema({
    EventName: {
        type: String,
        required: true,
    },
    Description: {
        type: String
    },
    EventPoster: {
        type: String
    },
    Datetime: {
        type: Date,
        default: "01/01/2008"
    },
    HallId: {
        type: Number
    },
    EventId: {
        type: Number,
        default: 0
    },
    Seats: [{
        SeatNumber: String,
        IsReserved: Boolean
    }]

}, { collection: 'Events' });
const Event = mongoose.model('Event', EventSchema);
//EventSchema.plugin(autoIncrement.plugin, { model: 'Event', field: 'EventId' });
module.exports.Event=Event;