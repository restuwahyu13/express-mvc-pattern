// @ts-nocheck
const { Model } = require('../../../core/Model');
const { CustomeMessage } = require('../../helpers/customeMessage');
const { Jwt } = require('../../libs/jwt');
class CreateMahasiswaController extends Model {
    constructor(collection, schema, req, res) {

        super(collection, schema);
        this.req = req;
        this.res = res;
        this.model = new Model(collection, schema);
        this.msg = new CustomeMessage(res);
        this.jwt = new Jwt();
    }
    async Controller() {

        const { req, res, model, msg, jwt } = this;
        const { name, npm, bid, fak } = req.body;
        await model.findOne({ name: name }).then(result => {

            if (!result) {

                const data = { name, npm, bid, fak };

                return model.create(data);

            } else {

                msg.error('error', 409, {

                    response: {

                        status: 'error',
                        code: res.statusCode,
                        method: req.method,
                        message: 'Oops..data already exists in database',
                        data: {
                            result: result
                        }
                    }
                });
            }
        }).then((doc) => {

            if (doc) {

                const token = jwt.createToken({...doc._doc._id }, { expiresIn: '1d', algorithm: 'HS384' });

                msg.success('success', 200, {

                    response: {

                        status: 'success',
                        code: res.statusCode,
                        method: req.method,
                        message: 'Yeah..data successuly store in database',
                        data: {
                            result: doc
                        },
                        token: {
                            secret: token
                        }
                    }
                });

            } else {

                msg.error('error', 403, {

                    response: {

                        status: 'error',
                        code: res.statusCode,
                        method: req.method,
                        message: 'Oops..data failed store in database'
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

module.exports = { CreateMahasiswaController };