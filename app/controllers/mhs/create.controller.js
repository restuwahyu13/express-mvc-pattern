const { Model } = require(`${process.cwd()}/core/Model`)
const { CustomeMessage } = require(`${process.cwd()}/app/helpers/customeMessage`)
const { Jwt } = require(`${process.cwd()}/app/libs/jwt`)

class CreateMahasiswaController extends Model {
  constructor(collection, schema, req, res) {
    super(collection, schema)
    this.req = req
    this.res = res
    this.model = new Model(collection, schema)
    this.msg = new CustomeMessage(res)
    this.jwt = new Jwt()
  }

  async Controller() {
    const { req, res, model, msg, jwt } = this
    const { name, npm, bid, fak } = req.body
    const user = await model.findOne({ name }).lean()
    if (user) {
      msg.error('error', 409, {
        response: {
          status: 'error',
          code: res.statusCode,
          method: req.method,
          message: 'Oops..data already exists in database',
          data: { ...user }
        }
      })
    }

    const { _id } = await model.create({ name, npm, bid, fak })
    const token = jwt.createToken({ _id, name }, { expiresIn: '1d', algorithm: 'HS384' })
    msg.success('success', 200, {
      response: {
        status: 'success',
        code: res.statusCode,
        method: req.method,
        message: 'Yeah..data successuly store in database',
        data: {
          secret: token
        }
      }
    })
  }
}

module.exports = { CreateMahasiswaController }
