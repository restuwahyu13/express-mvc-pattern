const { UpdateMahasiswaController } = require('controllers/mhs/update.controller')
const { Controller } = require('cores/Controller')
const AuthToken = require('middlewares/AuthToken')

class UpdateMahasiswaRoute extends Controller {
  constructor() {
    super()
    this.auth = AuthToken
  }
  route() {
    const { auth } = this
    return this.put('/mhs/update/:id', auth, (req, res) => new UpdateMahasiswaController().controller(req, res))
  }
}

module.exports = { UpdateMahasiswaRoute }
