const express = require('express')
const dotenv = require('dotenv')
const path = require('path')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const logger = require('morgan')
const EventEmitter = require('events')
const jsonwebtoken = require('jsonwebtoken')

class Module {
  constructor(app) {
    this.app = app
  }
  dotenv() {
    const env = dotenv.config()
    return env
  }
  bodyParser() {
    const { app } = this

    app.use(bodyParser.urlencoded({ extended: false }))
    app.use(bodyParser.json())
  }
  mongoose() {
    mongoose.Promise = global.Promise
    return mongoose
  }
  morgan() {
    const { app } = this
    app.use(logger('dev'))
  }
  event() {
    const events = new EventEmitter()
    return events
  }

  jwt() {
    return jsonwebtoken
  }

  template() {
    const { app } = this
    app.set('views', path.resolve(process.cwd(), 'views'))
    app.set('view engine', 'ejs')
  }

  assets() {
    const { app } = this
    app.use(express.static(path.resolve(process.cwd(), 'public/assets/')))
  }
}

module.exports = { Module }
