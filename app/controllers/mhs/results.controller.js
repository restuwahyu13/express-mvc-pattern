const { Model } = require(`${process.cwd()}/core/Model`)
const { CustomeMessage } = require(`${process.cwd()}/app/helpers/customeMessage`)

class ResultsMahasiswaController extends Model {
  constructor(collection, schema, req, res) {
    super(collection, schema)
    this.req = req
    this.res = res
    this.model = new Model(collection, schema)
    this.msg = new CustomeMessage(res)
  }
  async Controller() {
    const { req, res, model, msg } = this
    const users = await model.findAll()

    if (users.length < 1) {
      msg.error('error', 404, {
        response: {
          status: 'error',
          code: res.statusCode,
          method: req.method,
          message: 'Oops..data not found in database or deleted'
        }
      })
    }

    msg.success('success', 200, {
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
