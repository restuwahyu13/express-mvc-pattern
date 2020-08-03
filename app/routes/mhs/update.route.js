const { UpdateMahasiswaController } = require(`${process.cwd()}/app/controllers/mhs/update.controller`)
const { Controller } = require(`${process.cwd()}/core/Controller`)
const AuthToken = require(`${process.cwd()}/app/middlewares/AuthToken`)

class UpdateMahasiswaRoute extends Controller {
  constructor() {
    super()
    this.controller = new Controller()
  }
  route() {
    const { controller } = this
    return controller.put('/mhs/update/:id', (req, res) =>
      new UpdateMahasiswaController().controller(req, res)
    )
  }
}

module.exports = { UpdateMahasiswaRoute }
