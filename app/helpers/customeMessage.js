const { Module } = require(`${process.cwd()}/configs/Module`)
const mod = new Module()

class CustomeMessage {
  constructor(res) {
    this.response = res
    this.events = mod.event()
  }
  success(statusCode, message) {
    const { response, events } = this
    events.once('success', () => {
      return response.status(statusCode).json({ ...message })
    })

    return events.emit(event)
  }
  error(statusCode, message) {
    const { response, events } = this
    events.once('error', () => {
      return response.status(statusCode).json({ ...message })
    })
    return events.emit(event)
  }
}

module.exports = { CustomeMessage }
