const { Model } = require(`${process.cwd()}/core/Model`)
const { CustomeMessage } = require(`${process.cwd()}/app/helpers/customeMessage`)

class UpdateMahasiswaController extends Model {
  constructor(collection, schema, req, res) {
    super()
    this.req = req
    this.res = res
    this.id = req.params.id
    this.body = req.body
    this.model = new Model(collection, schema)
    this.msg = new CustomeMessage(res)
  }

  async controller() {
    const { req, res, id, body, model, msg } = this
    const { name, npm, bid, fak } = body
    const user = await model.findOneAndUpdate({ _id: id }, { name, npm, bid, fak })

    if (!user) {
      msg.error(404, {
        response: {
          status: 'error',
          code: res.statusCode,
          method: req.method,
          message: 'Oops..data not found in database or deleted'
        }
      })
    }

    msg.success(200, {
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
