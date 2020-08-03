const express = require('express')
const app = express()
const { Module } = require('./configs/Module')
const { Connection } = require('./configs/Connection')
const { Route } = require('./core/Route')

//init all module
const mod = new Module(app)
mod.bodyParser()
mod.dotenv()
mod.template()
mod.assets()
mod.morgan()

//init connection
new Connection().MongooseConnection()

//init default route
app.use(new Route().route())

module.exports = app
