const { Module } = require(`${process.cwd()}/configs/Module`)

class Model {
  constructor(collection, schema) {
    this.model = new Module().mongoose().model(collection, schema)
  }
  findAll() {
    const { model } = this
    return model.find({}).lean()
  }
  findOne(value) {
    const { model } = this
    return model.findOne({ ...value }).lean()
  }
  findById(value) {
    const { model } = this
    return model.findById(value).lean()
  }
  create(value) {
    const { model } = this
    const data = new model({ ...value })
    return data.save()
  }
  delete(value) {
    const { model } = this
    return model.findOneAndDelete({ ...value }).lean()
  }
  update(action, value) {
    const { model } = this
    return model.findOneAndUpdate({ ...action }, { $set: { ...value } }).lean()
  }
}

module.exports = { Model }
