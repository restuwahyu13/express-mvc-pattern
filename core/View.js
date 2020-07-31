const { resolve } = require('path')
class View {
  static view(res, view, data) {
    res.render(resolve(process.cwd(), `app/views/${view}`), { ...data })
  }
}

module.exports = { View }
