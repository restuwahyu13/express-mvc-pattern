const { Module } = require('./Module');
class Connection extends Module {
    constructor() {

        super();

        this.db = this.mongoose();
    }
    MongooseConnection() {

        const { db } = this;

        db.connect(process.env.URI_CONNECT, { useUnifiedTopology: true, useNewUrlParser: true })
            .then(() => console.log('Database Connected'))
            .catch(() => console.log('Database Error'));
    }
}

module.exports = { Connection };