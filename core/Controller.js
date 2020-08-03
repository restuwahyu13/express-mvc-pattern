class Controller {
  constructor(app) {
    this.app = app
  }
  get(...rest) {
    const { app } = this
    app.get(...arguments)
  }
  post(...rest) {
    const { app } = this
    app.post(...arguments)
  }
  delete(...rest) {
    const { app } = this
    app.delete(...arguments)
  }
  put(...rest) {
    const { app } = this
    app.put(...arguments)
  }
}

module.exports = { Controller }
