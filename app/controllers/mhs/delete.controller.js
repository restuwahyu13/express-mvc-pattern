const { Model } = require(`${process.cwd()}/core/Model`)
const { CustomeMessage } = require(`${process.cwd()}/app/helpers/customeMessage`)
class DeleteMahasiswaController extends Model {
  constructor() {
    super()
  }

  async controller(req, res, next) {
    const { id } = req.params
    const user = await model.findOneAndDelete({ _id: _id })

    if (!user) {
      new CustomeMessage(res).error(404, {
        response: {
          status: 'error',
          code: res.statusCode,
          method: req.method,
          message: 'Oops..data not found or deleted'
        }
      })
    }

    new CustomeMessage(res).success(200, {
      response: {
        status: 'success',
        code: res.statusCode,
        method: req.method,
        message: 'Yeah..data successfuly to deleted'
      }
    })
  }
}

module.exports = { DeleteMahasiswaController }
