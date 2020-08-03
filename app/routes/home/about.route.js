const { Controller } = require(`${process.cwd()}/core/Controller`)
const { View } = require(`${process.cwd()}/core/View`)
class AboutRoute extends Controller {
  constructor(app) {
    super()
    this.controller = new Controller(app)
    this.view = new View()
  }
  route() {
    let { controller, v } = this
    controller.get('/about', (req, res) => {
      v.render(res, 'home.views/about', {
        title1: 'Follow Me in Github:',
        title2: 'restuwahyu13',
        title3: 'Follow Me in Facebook:',
        title4: 'Restu Wahyu Saputra'
      })
    })
  }
}

module.exports = { AboutRoute }
