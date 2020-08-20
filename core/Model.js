const { Connection } = require('configs/Connection')
new Connection().MongooseConnection()

class Model {
  constructor(schema) {
    this.model = schema
  }

  findAll(value) {
    const { model } = this
    connection()
    return model.find({ ...value }).lean()
  }
  findOne(value) {
    const { model } = this
    return model.findOne({ ...value }).lean()
  }
  findById(value) {
    const { model } = this
    return model.findById(value).lean()
  }
  findOneAndCreate(value) {
    const { model } = this
    return model.create({ ...value })
  }
  findOneAndDelete(value) {
    const { model } = this
    return model.findOneAndDelete({ ...value }).lean()
  }
  findOneAndUpdate(id, value) {
    const { model } = this
    return model.findOneAndUpdate({ ...id }, { $set: { ...value } }).lean()
  }
}

module.exports = { Model }
