const { Module } = require(`${process.cwd()}/configs/Module`)
const mongoose = new Module().mongoose()
class Model {
  constructor(collection, schema) {
    this.model = new Module().mongoose().model(`${collection}`, new mongoose.Schema({ ...schema }))
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
  findOneAndCreate(value) {
    const { model } = this
    const user = model
      .findOne({ ...value })
      .lean()
      .exec(async (err, doc) => {
        if (err) return error
        const dataBody = new model({ ...value })
        return dataBody.save()
      })
  }
  findOneAndDelete(value) {
    const { model } = this
    return model.findOneAndDelete({ ...value }).lean()
  }
  findOneAndUpdate(action, value) {
    const { model } = this
    return model.findOneAndUpdate({ ...action }, { $set: { ...value } }).lean()
  }
}

module.exports = { Model }
