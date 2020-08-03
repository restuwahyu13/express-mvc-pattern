const { Controller } = require(`${process.cwd()}/core/Controller`)
const { View } = require(`${process.cwd()}/core/View`)
class HomeRoute extends Controller {
  constructor() {
    super()
    this.controller = new Controller()
    this.view = new View()
  }
  route() {
    const { controller, view } = this

    controller.get('/', (req, res) => {
      view.render(res, 'home.views/index', {
        name: 'Restu Wahyu Saputra'
      })
    })
  }
}

module.exports = { HomeRoute }
