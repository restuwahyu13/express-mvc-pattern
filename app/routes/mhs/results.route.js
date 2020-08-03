const { ResultsMahasiswaController } = require(`${process.cwd()}/app/controllers/mhs/results.controller`)
const { Controller } = require(`${process.cwd()}/core/Controller`)
const { mhsSchema } = require(`${process.cwd()}/app/models/mhs.model`)
const AuthToken = require(`${process.cwd()}/app/middlewares/AuthToken`)
class ResultsMahasiswaRoute extends Controller {
  constructor() {
    super()
    this.controller = new Controller()
    this.auth = AuthToken
  }
  route() {
    const { controller, schema, auth } = this
    return controller.get('/mhs/results', new ResultsMahasiswaController().controller)
  }
}

module.exports = { ResultsMahasiswaRoute }
