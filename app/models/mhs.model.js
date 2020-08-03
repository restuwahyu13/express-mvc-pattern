const { Model } = require(`${process.cwd()}/core/Model`)
const { Module } = require(`${process.cwd()}/configs/Module`)
const mongoose = new Module().mongoose()

// init schema
const setMhsSchema = {
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
}

const mhsSchema = mongoose.model('mhs', new mongoose.Schema(setMhsSchema))
module.exports = { mhsSchema }
