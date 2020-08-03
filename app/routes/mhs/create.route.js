const { CreateMahasiswaController } = require(`${process.cwd()}/app/controllers/mhs/create.controller`)
const { mhsSchema } = require(`${process.cwd()}/app/models/mhs.model`)
const { Controller } = require(`${process.cwd()}/core/Controller`)
class CreateMahasiswaRoute extends Controller {
  constructor(app) {
    super()
    this.controller = new Controller(app)
    this.schema = mhsSchema
  }
  route() {
    const { controller, schema } = this
    controller.post('/mhs/create', (req, res) => {
      return new CreateMahasiswaController('mhs', schema, req, res).Controller()
    })
  }
}

module.exports = { CreateMahasiswaRoute }
