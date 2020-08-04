const express = require('express')
const router = express.Router()

class Controller {
  get(...rest) {
    return router.get(...arguments)
  }
  post(...rest) {
    return router.post(...arguments)
  }
  delete(...rest) {
    return router.delete(...arguments)
  }
  put(...rest) {
    return router.put(...arguments)
  }
}

module.exports = { Controller }
