const { DeleteMahasiswaController } = require(`${process.cwd()}/app/controllers/mhs/delete.controller`)
const { Controller } = require(`${process.cwd()}/core/Controller`)
const AuthToken = require(`${process.cwd()}/app/middlewares/AuthToken`)
class DeleteMahasiswaRoute extends Controller {
  constructor() {
    super()
    this.controller = new Controller()
  }
  route() {
    const { controller } = this
    return controller.delete('/mhs/delete/:id', (req, res) =>
      new DeleteMahasiswaController().controller(req, res)
    )
  }
}

module.exports = { DeleteMahasiswaRoute }
