const { Module } = require('../../configs/Module');
const mongoose = new Module().mongoose();

// init schema
const mhsSchema = new mongoose.Schema({

    name: {

        type: String,
        trim: true,
        required: true
    },
    npm: {

        type: Number,
        trim: true,
        required: true
    },
    bid: {

        type: String,
        trim: true,
        required: true,
    },
    fak: {

        type: String,
        trim: true,
        required: true
    }
});

module.exports = { mhsSchema };