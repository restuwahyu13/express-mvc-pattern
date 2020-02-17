class Module {
    constructor(app = null) {

        this.app = app;
    }
    dotenv() {

        const dotenv = require('dotenv');
        const env = dotenv.config();
        return env;
    }
    bodyParser() {

        const { app } = this;

        const bodyParser = require('body-parser');
        app.use(bodyParser.urlencoded({ extended: false }));
        app.use(bodyParser.json());
    }
    mongoose() {

        const mongoose = require('mongoose');
        mongoose.Promise = global.Promise;
        return mongoose;
    }
    morgan() {

        const { app } = this;

        const logger = require('morgan');
        app.use(logger('dev'));
    }
    event() {

        const EventEmitter = require('events');
        const events = new EventEmitter;
        return events;
    }

    jwt() {

        const jwt = require('jsonwebtoken');
        return jwt;
    }

    template() {

        const { app } = this;
        const path = require('path');

        app.set('views', path.join(__dirname, '/views'));
        app.set('view engine', 'ejs');
    }

    assets(express) {

        const { app } = this;
        const path = require('path');
        app.use(express.static(path.join(__dirname, '../public/assets/')));
    }
}

module.exports = { Module };