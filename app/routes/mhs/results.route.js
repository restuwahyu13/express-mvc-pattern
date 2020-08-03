const { ResultsMahasiswaController } = require(`${process.cwd()}/app/controllers/mhs/results.controller`)
const { Controller } = require(`${process.cwd()}/core/Controller`)
const AuthToken = require(`${process.cwd()}/app/middlewares/AuthToken`)
class ResultsMahasiswaRoute extends Controller {
  constructor() {
    super()
    this.controller = new Controller()
    this.auth = AuthToken
  }
  route() {
    const { controller, auth } = this
    return controller.get('/mhs/results', (req, res) => new ResultsMahasiswaController().controller(req, res))
  }
}

module.exports = { ResultsMahasiswaRoute }
