const { DeleteMahasiswaController } = require(`${process.cwd()}/app/controllers/mhs/delete.controller`)
const { Controller } = require(`${process.cwd()}/core/Controller`)
const AuthToken = require(`${process.cwd()}/app/middlewares/AuthToken`)
class DeleteMahasiswaRoute extends Controller {
  constructor() {
    this.auth = AuthToken
  }
  route() {
    const { auth } = this
    return super.delete('/mhs/delete/:id', auth, (req, res) =>
      new DeleteMahasiswaController().controller(req, res)
    )
  }
}

module.exports = { DeleteMahasiswaRoute }
