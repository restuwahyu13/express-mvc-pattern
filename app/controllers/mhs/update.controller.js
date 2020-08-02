const { Model } = require(`${process.cwd()}/core/Model`)
const { CustomeMessage } = require(`${process.cwd()}/app/helpers/customeMessage`)

class UpdateMahasiswaController extends Model {
  constructor(collection, schema, req, res) {
    super(collection, schema)
    this.req = req
    this.res = res
    this.id = req.params.id
    this.name = req.body.name
    this.npm = req.body.npm
    this.bid = req.body.bid
    this.fak = req.body.fak
    this.model = new Model(collection, schema)
    this.msg = new CustomeMessage(res)
  }

  async Controller() {
    const { req, res, id, name, npm, bid, fak, model, msg } = this
    const user = await model.findOneAndUpdate({ _id: id }, { name, npm, bid, fak })

    if (!user) {
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
        message: 'Yeah..data sucessfuly to updated',
        data: { ...user }
      }
    })
  }
}

module.exports = { UpdateMahasiswaController }
