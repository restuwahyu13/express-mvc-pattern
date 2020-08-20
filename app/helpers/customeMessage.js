const { Module } = require('configs/Module')
const mod = new Module()

class CustomeMessage {
  constructor(res) {
    this.response = res
    this.events = mod.event()
  }
  success(statusCode, message) {
    const { response, events } = this
    events.once('success', () => response.status(statusCode).json({ ...message }))
    return events.emit('success')
  }
  error(statusCode, message) {
    const { response, events } = this
    events.once('error', () => response.status(statusCode).json({ ...message }))
    return events.emit('error')
  }
}

module.exports = { CustomeMessage }
