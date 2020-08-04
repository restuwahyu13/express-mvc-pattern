const { resolve } = require('path')

class View {
  render(res, view, data) {
    return res.render(resolve(process.cwd(), `app/views/${view}`), { ...data })
  }
}

module.exports = { View }
