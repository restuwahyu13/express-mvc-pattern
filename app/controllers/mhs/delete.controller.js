const { Model } = require(`${process.cwd()}/core/Model`)
const { mhsSchema } = require(`${process.cwd()}/app/models/mhs.model`)
const { CustomeMessage } = require(`${process.cwd()}/app/helpers/customeMessage`)
class DeleteMahasiswaController extends Model {
  constructor() {
    super()
    this.model = new Model(mhsSchema)
  }

  async controller(req, res, next) {
    const { id } = req.params
    const { model } = this
    const user = await model.findOneAndDelete({ _id: id })

    if (!user) {
      return new CustomeMessage(res).error(404, {
        response: {
          status: 'error',
          code: res.statusCode,
          method: req.method,
          message: 'Oops..data not exist or deleted from owner'
        }
      })
    }

    return new CustomeMessage(res).success(200, {
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
