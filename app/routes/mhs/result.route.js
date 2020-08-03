const { ResultMahasiswaController } = require(`${process.cwd()}/app/controllers/mhs/result.controller`)
const { Controller } = require(`${process.cwd()}/core/Controller`)
const { mhsSchema } = require(`${process.cwd()}/app/models/mhs.model`)
const AuthToken = require(`${process.cwd()}/app/middlewares/AuthToken`)
class ResultMahasiswaRoute extends Controller {
  constructor(app) {
    super()
    this.controller = new Controller(app)
    this.schema = mhsSchema
  }
  route() {
    const { controller, schema } = this
    controller.get('/mhs/result/:id', AuthToken, (req, res) => {
      return new ResultMahasiswaController('mhs', schema, req, res).Controller()
    })
  }
}

module.exports = { ResultMahasiswaRoute }
