const { Model } = require(`${process.cwd()}/core/Model`)
const { CustomeMessage } = require(`${process.cwd()}/app/helpers/customeMessage`)
const { Jwt } = require(`${process.cwd()}/app/libs/jwt`)

class RefeshTokenController extends Model {
  constructor(collection, schema, req, res) {
    super(collection, schema)
    this.req = req
    this.res = res
    this.name = req.body.name
    this.npm = req.body.npm
    this.model = new Model(collection, schema)
    this.msg = new CustomeMessage(res)
    this.jwt = new Jwt()
  }

  async Controller() {
    const { req, res, name, npm, model, msg, jwt } = this
    const users = await model.findAll({ $or: [{ name }, { npm }] })

    if (users.length < 1) {
      msg.error('error', 404, {
        response: {
          status: 'error',
          code: res.statusCode,
          method: req.method,
          message: 'Oops..refesh token failed'
        }
      })
    }

    const { _id } = users[0]
    const refeshToken = jwt.createToken({ _id, name }, { expiresIn: '7d', algorithm: 'HS384' })

    msg.success('success', 200, {
      response: {
        status: 'success',
        code: res.statusCode,
        method: req.method,
        message: 'Yeah..refesh token sucessfuly',
        token: {
          secret: refeshToken
        }
      }
    })
  }
}

module.exports = { RefeshTokenController }
