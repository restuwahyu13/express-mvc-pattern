const { UpdateMahasiswaController } = require('../../controllers/mhs.controller/update.controller');
const { Controller } = require('../../../core/Controller');
const { mhsSchema } = require('../../models/mhs.model');
const AuthToken = require('../../middlewares/AuthToken');
class UpdateMahasiswaRoute extends Controller {
    constructor(app) {

        super(app);
        this.controller = new Controller(app);
        this.schema = mhsSchema;
    }
    Route() {

        const { controller, schema } = this;
        controller.PUT('/mhs/update/:id', AuthToken, (req, res) => {

            return new UpdateMahasiswaController('mhs', schema, req, res).Controller();
        });
    }
}

module.exports = { UpdateMahasiswaRoute };