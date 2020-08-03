const { UpdateMahasiswaController } = require(`${process.cwd()}/app/controllers/mhs/update.controller`)
const { Controller } = require(`${process.cwd()}/core/Controller`)
const { mhsSchema } = require(`${process.cwd()}/app/models/mhs.model`)
const AuthToken = require(`${process.cwd()}/app/middlewares/AuthToken`)

class UpdateMahasiswaRoute extends Controller {
  constructor() {
    super()
    this.controller = new Controller()
    this.schema = mhsSchema
  }
  route() {
    const { controller, schema } = this
    return controller.put('/mhs/update/:id', new UpdateMahasiswaController().controller)
  }
}

module.exports = { UpdateMahasiswaRoute }
