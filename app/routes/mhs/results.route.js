const { ResultsMahasiswaController } = require('controllers/mhs/results.controller')
const { Controller } = require('cores/Controller')
const AuthToken = require('middlewares/AuthToken')

class ResultsMahasiswaRoute extends Controller {
  constructor() {
    super()
    this.auth = AuthToken
  }
  route() {
    const { auth } = this
    return this.get('/mhs/results', auth, (req, res) => new ResultsMahasiswaController().controller(req, res))
  }
}

module.exports = { ResultsMahasiswaRoute }
