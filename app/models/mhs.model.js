const { Model } = require(`${process.cwd()}/core/Model`)

new Model('mhs', {
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
