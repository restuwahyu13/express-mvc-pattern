const { Module } = require('../configs/Module');
class Model {
    constructor(collection, schema) {

        this.model = new Module().mongoose().model(collection, schema);
    }
    findAll() {

        const { model } = this;
        return model.find({}).lean(true);
    }
    findOne(value) {

        const { model } = this;
        return model.findOne({...value }).lean(true);
    }
    create(value) {

        const { model } = this;
        const data = new model({...value });
        return data.save();
    }
    delete(value) {

        const { model } = this;
        return model.deleteOne({...value });
    }
    update(action, value) {

        const { model } = this;
        return model.updateOne({...action }, {...value });
    }
}

module.exports = { Model };