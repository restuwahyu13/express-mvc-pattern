const { Model } = require(`${process.cwd()}/core/Model`)
const { CustomeMessage } = require(`${process.cwd()}/app/helpers/customeMessage`)
class ResultsMahasiswaController extends Model {
  constructor() {
    super()
  }

  async controller(req, res, next) {
    const { msg } = this
    const users = await this.findAll()

    if (users.length < 1) {
      new CustomeMessage(res).error(404, {
        response: {
          status: 'error',
          code: res.statusCode,
          method: req.method,
          message: 'Oops..data not found in database or deleted'
        }
      })
    }

    new CustomeMessage(res).success(200, {
      response: {
        status: 'success',
        code: res.statusCode,
        method: req.method,
        message: 'Yeah..data already to use',
        data: { ...result }
      }
    })
  }
}

module.exports = { ResultsMahasiswaController }
