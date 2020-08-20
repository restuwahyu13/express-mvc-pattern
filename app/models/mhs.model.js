const { Module } = require('configs/Module')
const mongoose = new Module().mongoose()

const setMhsSchema = new mongoose.Schema({
  nama: {
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
    required: true
  },
  fak: {
    type: String,
    trim: true,
    required: true
  },
  created_at: {
    type: Date,
    default: null
  },
  updated_at: {
    type: Date,
    default: null
  }
})

const mhsSchema = mongoose.model('mhs', setMhsSchema)
module.exports = { mhsSchema }
