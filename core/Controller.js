class Controller {
    constructor(app) {

        this.app = app;
    }
    GET(route, auth, callback) {

        const { app } = this;

        app.get(route, auth, callback);
    }
    POST(route, callback) {

        const { app } = this;

        app.post(route, callback);
    }
    DELETE(route, auth, callback) {

        const { app } = this;

        app.delete(route, auth, callback);
    }
    PUT(route, auth, callback) {

        const { app } = this;

        app.put(route, auth, callback);
    }
}

module.exports = { Controller };