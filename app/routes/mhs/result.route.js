const { ResultMahasiswaController } = require(`${process.cwd()}/app/controllers/mhs/result.controller`)
const { Controller } = require(`${process.cwd()}/core/Controller`)
const { mhsSchema } = require(`${process.cwd()}/app/models/mhs.model`)
const AuthToken = require(`${process.cwd()}/app/middlewares/AuthToken`)
class ResultMahasiswaRoute extends Controller {
  constructor() {
    super()
    this.controller = new Controller()
  }
  route() {
    const { controller } = this
    return controller.get('/mhs/result/:id', new ResultMahasiswaController().controller)
  }
}

module.exports = { ResultMahasiswaRoute }
