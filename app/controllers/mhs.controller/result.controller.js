// @ts-nocheck
const { Model } = require('../../../core/Model');
const { CustomeMessage } = require('../../helpers/customeMessage');
class ResultMahasiswaController extends Model {
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
        await model.findOne({ _id: id }).then((result) => {

            if (result) {
                msg.success('success', 200, {

                    response: {

                        status: 'success',
                        code: res.statusCode,
                        method: req.method,
                        message: 'Yeah..data already to use',
                        data: {
                            result: result
                        }
                    }
                });

            } else {

                msg.error('error', 404, {

                    response: {

                        status: 'error',
                        code: 404,
                        method: req.method,
                        message: 'Oops..data not found in database or deleted'
                    }
                });
            }
        }).catch(err => {

            msg.error('error', 500, {

                response: {

                    status: 'error',
                    code: res.statusCode,
                    method: req.method,
                    message: `Internal server error ${err}`
                }
            });
        });
    }
}

module.exports = { ResultMahasiswaController };