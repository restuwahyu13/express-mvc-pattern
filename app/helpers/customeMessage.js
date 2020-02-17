const { Module } = require('../../configs/Module');
const mod = new Module();
class CustomeMessage {
    constructor(res) {

        this.response = res;
        this.events = mod.event();
    }
    async success(event, statusCode, message) {

        let { response, events } = this;
        events.once(event, () => {

            return response.status(statusCode).json(message);
        });

        return await events.emit(event);
    }
    async error(event, statusCode, message) {

        let { response, events } = this;
        events.once(event, () => {

            return response.status(statusCode).json(message);
        });

        return await events.emit(event);
    }

}

module.exports = { CustomeMessage };