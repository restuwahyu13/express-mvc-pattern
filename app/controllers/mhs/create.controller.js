const { Model } = require(`${process.cwd()}/core/Model`)
const { CustomeMessage } = require(`${process.cwd()}/app/helpers/customeMessage`)
const { Jwt } = require(`${process.cwd()}/app/libs/jwt`)
class CreateMahasiswaController extends Model {
  constructor() {
    super()
    this.jwt = new Jwt()
  }

  async controller(req, res, next) {
    const { jwt } = this
    const { name, npm, bid, fak } = req.body
    const user = await model.findOneAndCreate({ name, npm, bid, fak })

    if (user) {
      new CustomeMessage(res).error('error', 409, {
        response: {
          status: 'error',
          code: res.statusCode,
          method: req.method,
          message: 'Oops..data already exists in database',
          data: { ...user }
        }
      })
    }

    const token = jwt.createToken({ _id, name }, { expiresIn: '1d', algorithm: 'HS384' })
    new CustomeMessage(res).success('success', 200, {
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
