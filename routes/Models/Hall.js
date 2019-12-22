const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const autoIncrement = require('mongoose-auto-increment');
//autoIncrement.initialize(mongoose.connection)

const HallSchema = new mongoose.Schema({
    HallId: {
        type: Number,
        unique: true
    },
    SeatsCount: {
        type: Number
    }

}, { collection: 'Hall' });
const Hall = mongoose.model('Hall', HallSchema);

module.exports.Hall=Hall;