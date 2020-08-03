const { Model } = require(`${process.cwd()}/core/Model`)
const { CustomeMessage } = require(`${process.cwd()}/app/helpers/customeMessage`)
class UpdateMahasiswaController extends Model {
  constructor() {
    super()
  }

  async controller(req, res, next) {
    const { id } = req.params
    const { name, npm, bid, fak } = req.body
    const user = await model.findOneAndUpdate({ _id: id }, { name, npm, bid, fak })

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
        message: 'Yeah..data sucessfuly to updated',
        data: { ...user }
      }
    })
  }
}

module.exports = { UpdateMahasiswaController }
