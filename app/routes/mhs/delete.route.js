const { DeleteMahasiswaController } = require('controllers/mhs/delete.controller')
const { Controller } = require('cores/Controller')
const AuthToken = require('middlewares/AuthToken')

class DeleteMahasiswaRoute extends Controller {
  constructor() {
    super()
    this.auth = AuthToken
  }
  route() {
    const { auth } = this
    return this.delete('/mhs/delete/:id', auth, (req, res) => new DeleteMahasiswaController().controller(req, res))
  }
}

module.exports = { DeleteMahasiswaRoute }
