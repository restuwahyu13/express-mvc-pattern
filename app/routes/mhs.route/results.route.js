const { ResultsMahasiswaController } = require('../../controllers/mhs.controller/results.controller');
const { mhsSchema } = require('../../models/mhs.model');
const { Controller } = require('../../../core/Controller');
const AuthToken = require('../../middlewares/AuthToken');
class ResultsMahasiswaRoute extends Controller {
    constructor(app) {

        super(app);
        this.controller = new Controller(app);
        this.schema = mhsSchema;
        this.auth = AuthToken;
    }
    Route() {

        const { controller, schema, auth } = this;
        controller.GET('/mhs/results', auth, (req, res, next) => {

            return new ResultsMahasiswaController('mhs', schema, req, res).Controller();
        });
    }
}

module.exports = { ResultsMahasiswaRoute };