const { CreateMahasiswaController } = require('controllers/mhs/create.controller')
const { Controller } = require('cores/Controller')

class CreateMahasiswaRoute extends Controller {
  constructor() {
    super()
  }
  route() {
    return this.post('/mhs/create', (req, res) => new CreateMahasiswaController().controller(req, res))
  }
}

module.exports = { CreateMahasiswaRoute }
