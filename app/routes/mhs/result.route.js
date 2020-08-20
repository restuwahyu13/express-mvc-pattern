const { ResultMahasiswaController } = require('controllers/mhs/result.controller')
const { Controller } = require('cores/Controller')
const AuthToken = require('middlewares/AuthToken')

class ResultMahasiswaRoute extends Controller {
  constructor() {
    super()
    this.auth = AuthToken
  }
  route() {
    const { auth } = this
    return this.get('/mhs/result/:id', (req, res) => new ResultMahasiswaController().controller(req, res))
  }
}

module.exports = { ResultMahasiswaRoute }
