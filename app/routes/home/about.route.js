const { Controller } = require(`${process.cwd()}/core/Controller`)
const { View } = require(`${process.cwd()}/core/View`)
class AboutRoute extends Controller {
  constructor() {
    super()
    this.controller = new Controller()
    this.view = new View()
  }
  route() {
    const { controller, view } = this

    controller.get('/about', (req, res) => {
      view.render(res, 'home.views/about', {
        title1: 'Follow Me in Github:',
        title2: 'restuwahyu13',
        title3: 'Follow Me in Facebook:',
        title4: 'Restu Wahyu Saputra'
      })
    })
  }
}

module.exports = { AboutRoute }
