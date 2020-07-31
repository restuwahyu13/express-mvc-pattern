const { ResultsMahasiswaController } = require(`${process.cwd()}/app/controllers/mhs/results.controller`)
const { Controller } = require(`${process.cwd()}/core/Controller`)
const { mhsSchema } = require(`${process.cwd()}/app/models/mhs.model`)
const AuthToken = require(`${process.cwd()}/app/middlewares/AuthToken`)
class ResultsMahasiswaRoute extends Controller {
  constructor(app) {
    super(app)
    this.controller = new Controller(app)
    this.schema = mhsSchema
    this.auth = AuthToken
  }
  Route() {
    const { controller, schema, auth } = this
    controller.GET('/mhs/results', auth, (req, res, next) => {
      return new ResultsMahasiswaController('mhs', schema, req, res).Controller()
    })
  }
}

module.exports = { ResultsMahasiswaRoute }
