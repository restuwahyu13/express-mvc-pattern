const { Model } = require('cores/Model')
const { mhsSchema } = require('models/mhs.model')
const { CustomeMessage } = require('helpers/customeMessage')

class ResultsMahasiswaController extends Model {
  constructor() {
    super()
    this.model = new Model(mhsSchema)
  }

  async controller(req, res, next) {
    const { model } = this
    const users = await model.findAll()

    if (users.length < 1) {
      return new CustomeMessage(res).error(404, {
        response: {
          status: 'error',
          code: res.statusCode,
          method: req.method,
          message: 'Oops..data not exists or deleted from owner'
        }
      })
    }

    return new CustomeMessage(res).success(200, {
      response: {
        status: 'success',
        code: res.statusCode,
        method: req.method,
        message: 'Yeah..data already to use',
        data: users
      }
    })
  }
}

module.exports = { ResultsMahasiswaController }
