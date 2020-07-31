const { UpdateMahasiswaController } = require(`${process.cwd()}/app/controllers/mhs/update.controller`)
const { Controller } = require(`${process.cwd()}/core/Controller`)
const { mhsSchema } = require(`${process.cwd()}/app/models/mhs.model`)
const AuthToken = require(`${process.cwd()}/app/middlewares/AuthToken`)
class UpdateMahasiswaRoute extends Controller {
  constructor(app) {
    super(app)
    this.controller = new Controller(app)
    this.schema = mhsSchema
  }
  Route() {
    const { controller, schema } = this
    controller.PUT('/mhs/update/:id', AuthToken, (req, res) => {
      return new UpdateMahasiswaController('mhs', schema, req, res).Controller()
    })
  }
}

module.exports = { UpdateMahasiswaRoute }
