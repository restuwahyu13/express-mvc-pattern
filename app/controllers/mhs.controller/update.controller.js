// @ts-nocheck
const { Model } = require('../../../core/Model');
const { CustomeMessage } = require('../../helpers/customeMessage');
class UpdateMahasiswaController extends Model {
    constructor(collection, schema, req, res) {

        super(collection, schema);
        this.req = req;
        this.res = res;
        this.id = req.params.id;
        this.name = req.body.name;
        this.npm = req.body.npm;
        this.bid = req.body.bid;
        this.fak = req.body.fak;
        this.model = new Model(collection, schema);
        this.msg = new CustomeMessage(res);
    }
    async Controller() {

        const { req, res, id, name, npm, bid, fak, model, msg } = this;
        await model.findOne({ _id: id }).then((result) => {

            if (result) {

                const data = { name, npm, bid, fak };
                return model.update({ _id: id }, {...data });

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
        }).then(doc => {

            if (doc.ok > 0) {

                msg.success('success', 200, {

                    response: {

                        status: 'success',
                        code: res.statusCode,
                        method: req.method,
                        message: 'Yeah..data sucessfuly to updated'
                    }
                });

            } else {

                msg.error('error', 403, {

                    response: {

                        status: 'error',
                        code: 403,
                        method: req.method,
                        message: 'Oops..data failed to updated'
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

module.exports = { UpdateMahasiswaController };