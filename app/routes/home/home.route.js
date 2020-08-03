const { Controller } = require(`${process.cwd()}/core/Controller`)
const { View } = require(`${process.cwd()}/core/View`)
class HomeRoute extends Controller {
  constructor(app) {
    super(app)
    this.controller = new Controller(app)
    this.v = View
  }
  route() {
    let { controller, v } = this
    controller.get('/', (req, res) => {
      v.view(res, 'home.views/index', {
        name: 'Restu Wahyu Saputra'
      })
    })
  }
}

module.exports = { HomeRoute }
