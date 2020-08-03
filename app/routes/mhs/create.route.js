const { CreateMahasiswaController } = require(`${process.cwd()}/app/controllers/mhs/create.controller`)
const { mhsSchema } = require(`${process.cwd()}/app/models/mhs.model`)
const { Controller } = require(`${process.cwd()}/core/Controller`)
class CreateMahasiswaRoute extends Controller {
  constructor() {
    super()
    this.controller = new Controller()
  }
  route() {
    const { controller } = this
    return controller.post('/mhs/create', (req, res) => new CreateMahasiswaController().controller)
  }
}

module.exports = { CreateMahasiswaRoute }
