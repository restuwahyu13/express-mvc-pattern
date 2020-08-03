const { CreateMahasiswaController } = require(`${process.cwd()}/app/controllers/mhs/create.controller`)
const { Controller } = require(`${process.cwd()}/core/Controller`)
class CreateMahasiswaRoute extends Controller {
  constructor() {
    super()
  }
  route() {
    return this.post('/mhs/create', (req, res) => new CreateMahasiswaController().controller(req, res))
  }
}

module.exports = { CreateMahasiswaRoute }
