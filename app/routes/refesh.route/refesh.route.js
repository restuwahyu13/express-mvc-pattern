const { RefeshTokenController } = require('../../controllers/refesh.controller/refesh.controller');
const { Controller } = require('../../../core/Controller');
const { mhsSchema } = require('../../models/mhs.model');
class RefeshTokenRoute extends Controller {
    constructor(app) {

        super(app);
        this.controller = new Controller(app);
        this.schema = mhsSchema;
    }
    Route() {

        const { controller, schema } = this;
        controller.GET('/refeshtoken', [], (req, res) => {

            return new RefeshTokenController('mhs', schema, req, res).Controller();
        });
    }
}

module.exports = { RefeshTokenRoute };