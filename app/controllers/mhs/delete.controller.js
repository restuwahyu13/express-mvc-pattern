const { Model } = require(`${process.cwd()}/core/Model`)
const { CustomeMessage } = require(`${process.cwd()}/app/helpers/customeMessage`)

class DeleteMahasiswaController extends Model {
  constructor(collection, schema, req, res) {
    super(collection, schema)
    this.req = req
    this.res = res
    this.id = req.params.id
    this.model = new Model(collection, schema)
    this.msg = new CustomeMessage(res)
  }

  async controller() {
    const { req, res, id, model, msg } = this
    const user = await model.findOneAndDelete({ _id: _id })

    if (!user) {
      msg.error(404, {
        response: {
          status: 'error',
          code: res.statusCode,
          method: req.method,
          message: 'Oops..data not found or deleted'
        }
      })
    }

    msg.success(200, {
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
