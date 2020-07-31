class Controller {
  constructor(app) {
    this.app = app
  }
  GET(path, callback) {
    const { app } = this
    app.get(path, callback)
  }
  POST(path, callback) {
    const { app } = this
    app.post(path, callback)
  }
  DELETE(path, auth, callback) {
    const { app } = this
    app.delete(path, auth, callback)
  }
  PUT(path, auth, callback) {
    const { app } = this
    app.put(path, auth, callback)
  }
}

module.exports = { Controller }
