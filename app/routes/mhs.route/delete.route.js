const { DeleteMahasiswaController } = require('../../controllers/mhs.controller/delete.controller');
const { Controller } = require('../../../core/Controller');
const { mhsSchema } = require('../../models/mhs.model');
const AuthToken = require('../../middlewares/AuthToken');
class DeleteMahasiswaRoute extends Controller {
    constructor(app) {

        super(app);
        this.controller = new Controller(app);
        this.schema = mhsSchema;
    }
    Route() {

        const { controller, schema } = this;
        controller.DELETE('/mhs/delete/:id', AuthToken, (req, res) => {

            return new DeleteMahasiswaController('mhs', schema, req, res).Controller();
        });
    }
}

module.exports = { DeleteMahasiswaRoute };