const { Model } = require(`${process.cwd()}/core/Model`)
const { CustomeMessage } = require(`${process.cwd()}/app/helpers/customeMessage`)

class ResultMahasiswaController extends Model {
  constructor() {
    super()
  }
  async controller(req, res, next) {
    const { id } = req.params.id
    const user = await model.findById(id)

    if (!user) {
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

module.exports = { ResultMahasiswaController }
