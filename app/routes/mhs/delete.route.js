const { DeleteMahasiswaController } = require(`${process.cwd()}/app/controllers/mhs/delete.controller`)
const { Controller } = require(`${process.cwd()}/core/Controller`)
const { mhsSchema } = require(`${process.cwd()}/app/models/mhs.model`)
const AuthToken = require(`${process.cwd()}/app/middlewares/AuthToken`)
class DeleteMahasiswaRoute extends Controller {
  constructor() {
    super()
    this.controller = new Controller()
  }
  route() {
    const { controller, schema } = this
    return controller.delete('/mhs/delete/:id', new DeleteMahasiswaController().controller)
  }
}

module.exports = { DeleteMahasiswaRoute }
