const { UpdateMahasiswaController } = require(`${process.cwd()}/app/controllers/mhs/update.controller`)
const { Controller } = require(`${process.cwd()}/core/Controller`)
const AuthToken = require(`${process.cwd()}/app/middlewares/AuthToken`)

class UpdateMahasiswaRoute extends Controller {
  constructor() {
    this.auth = AuthToken
  }
  route() {
    return super.put('/mhs/update/:id', auth, (req, res) =>
      new UpdateMahasiswaController().controller(req, res)
    )
  }
}

module.exports = { UpdateMahasiswaRoute }
