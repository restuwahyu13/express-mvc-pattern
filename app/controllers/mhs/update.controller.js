const { Model } = require('cores/Model')
const { mhsSchema } = require('models/mhs.model')
const { CustomeMessage } = require('helpers/customeMessage')

class UpdateMahasiswaController extends Model {
  constructor() {
    super()
    this.model = new Model(mhsSchema)
  }

  async controller(req, res, next) {
    const { model } = this
    const { id } = req.params
    const { nama, npm, bid, fak } = req.body
    const user = await model.findOneAndUpdate({ _id: id }, { nama, npm, bid, fak, updated_at: new Date() })

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
        message: 'Yeah..data sucessfuly to updated'
      }
    })
  }
}

module.exports = { UpdateMahasiswaController }
