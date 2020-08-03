const { UpdateMahasiswaController } = require(`${process.cwd()}/app/controllers/mhs/update.controller`)
const { Controller } = require(`${process.cwd()}/core/Controller`)
const AuthToken = require(`${process.cwd()}/app/middlewares/AuthToken`)

class UpdateMahasiswaRoute extends Controller {
  constructor() {
    super()
    this.auth = AuthToken
  }
  route() {
    const { auth } = this
    return this.put('/mhs/update/:id', auth, (req, res) =>
      new UpdateMahasiswaController().controller(req, res)
    )
  }
}

module.exports = { UpdateMahasiswaRoute }
