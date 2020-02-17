// @ts-nocheck
const { Model } = require('../../../core/Model');
const { CustomeMessage } = require('../../helpers/customeMessage');
class DeleteMahasiswaController extends Model {
    constructor(collection, schema, req, res) {

        super(collection, schema);
        this.req = req;
        this.res = res;
        this.id = req.params.id;
        this.model = new Model(collection, schema);
        this.msg = new CustomeMessage(res);
    }
    async Controller() {

        const { req, res, id, model, msg } = this;
        await model.findOne({ _id: id }).then(async result => {

            if (result) {

                const action = await model.delete({ _id: id });

                if (action.deletedCount > 0) {

                    msg.success('success', 200, {

                        response: {

                            status: 'success',
                            code: res.statusCode,
                            method: req.method,
                            message: 'Yeah..data successfuly to deleted'
                        }
                    });

                } else {

                    msg.error('error', 403, {

                        response: {

                            status: 'error',
                            code: 403,
                            method: req.method,
                            message: 'Oops..data failed to deleted'
                        }
                    });
                }

            } else {

                msg.error('error', 404, {

                    response: {

                        status: 'error',
                        code: 404,
                        method: req.method,
                        message: 'Oops..data not found or deleted'
                    }
                });
            }
        }).catch(err => {

            msg.error('error', 500, {

                response: {

                    status: 'error',
                    code: 500,
                    method: req.method,
                    message: `Internal server error ${err}`
                }
            });
        });
    }
}

module.exports = { DeleteMahasiswaController };