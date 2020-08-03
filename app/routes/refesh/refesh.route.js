const { RefeshTokenController } = require(`${process.cwd()}/app/controllers/refesh/refesh.controller`)
const { Controller } = require(`${process.cwd()}/core/Controller`)
const { mhsSchema } = require(`${process.cwd()}/app/models/mhs.model`)
class RefeshTokenRoute extends Controller {
  constructor(app) {
    super(app)
    this.controller = new Controller(app)
    this.schema = mhsSchema
  }
  route() {
    const { controller, schema } = this
    controller.get('/refeshtoken', (req, res) => {
      return new RefeshTokenController('mhs', schema, req, res).Controller()
    })
  }
}

module.exports = { RefeshTokenRoute }
