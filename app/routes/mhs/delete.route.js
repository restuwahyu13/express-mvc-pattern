const { DeleteMahasiswaController } = require(`${process.cwd()}/app/controllers/mhs/delete.controller`)
const { Controller } = require(`${process.cwd()}/core/Controller`)
const { mhsSchema } = require(`${process.cwd()}/app/models/mhs.model`)
const AuthToken = require(`${process.cwd()}/app/middlewares/AuthToken`)
class DeleteMahasiswaRoute extends Controller {
  constructor(app) {
    super(app)
    this.controller = new Controller(app)
    this.schema = mhsSchema
  }
  Route() {
    const { controller, schema } = this
    controller.DELETE('/mhs/delete/:id', AuthToken, (req, res) => {
      return new DeleteMahasiswaController('mhs', schema, req, res).Controller()
    })
  }
}

module.exports = { DeleteMahasiswaRoute }
