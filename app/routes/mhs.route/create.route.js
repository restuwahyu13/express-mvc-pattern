const { CreateMahasiswaController } = require('../../controllers/mhs.controller/create.controller');
const { mhsSchema } = require('../../models/mhs.model');
const { Controller } = require('../../../core/Controller');
class CreateMahasiswaRoute extends Controller {
    constructor(app) {

        super(app);
        this.controller = new Controller(app);
        this.schema = mhsSchema;
    }
    Route() {

        const { controller, schema } = this;
        controller.POST('/mhs/create', (req, res) => {

            return new CreateMahasiswaController('mhs', schema, req, res).Controller();
        });
    }
}

module.exports = { CreateMahasiswaRoute };