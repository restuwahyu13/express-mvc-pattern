const { Module } = require('./Module')
class Connection extends Module {
  constructor() {
    super()
    this.db = this.mongoose()
  }
  MongooseConnection() {
    const { db } = this
    db.connect(process.env.MONGO_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useFindAndModify: true
    })
      .then(() => console.log('Database Connected'))
      .catch(() => console.log('Database Not Connected'))
  }
}

module.exports = { Connection }
