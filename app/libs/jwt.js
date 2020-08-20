const { Module } = require('configs/Module')
const mod = new Module()
const jwt = mod.jwt()

class Jwt {
  createToken(payload, options) {
    return jwt.sign({ ...payload }, process.env.JWT_SECRET, { ...options })
  }
}

module.exports = { Jwt }
