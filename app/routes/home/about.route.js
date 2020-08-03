const { Controller } = require(`${process.cwd()}/core/Controller`)
const { View } = require(`${process.cwd()}/core/View`)
class AboutRoute extends Controller {
  constructor() {
    super()
    this.view = new View()
  }
  route() {
    const { view } = this
    return this.get('/about', (req, res) => {
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
