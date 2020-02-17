const { ResultMahasiswaController } = require('../../controllers/mhs.controller/result.controller');
const { Controller } = require('../../../core/Controller');
const { mhsSchema } = require('../../models/mhs.model');
const AuthToken = require('../../middlewares/AuthToken');
class ResultMahasiswaRoute extends Controller {
    constructor(app) {

        super(app);
        this.controller = new Controller(app);
        this.schema = mhsSchema;
    }
    Route() {

        const { controller, schema } = this;
        controller.GET('/mhs/result/:id', AuthToken, (req, res) => {

            return new ResultMahasiswaController('mhs', schema, req, res).Controller();
        });
    }
}

module.exports = { ResultMahasiswaRoute };