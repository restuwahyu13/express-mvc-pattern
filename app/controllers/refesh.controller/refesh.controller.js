// @ts-nocheck
const { Model } = require('../../../core/Model');
const { CustomeMessage } = require('../../helpers/customeMessage');
const { Jwt } = require('../../libs/jwt');
class RefeshTokenController extends Model {
    constructor(collection, schema, req, res) {

        super(collection, schema);
        this.req = req;
        this.res = res;
        this.name = req.body.name;
        this.npm = req.body.npm;
        this.model = new Model(collection, schema);
        this.msg = new CustomeMessage(res);
        this.jwt = new Jwt();
    }
    async Controller() {

        const { req, res, name, npm, model, msg, jwt } = this;
        await model.findAll().or([{ name: name }, { npm: npm }]).then((result) => {

            if (result) {

                const refeshToken = jwt.createToken({...result[0]['_id'] }, { expiresIn: '7d', algorithm: 'HS384' });

                msg.success('success', 200, {

                    response: {

                        status: 'success',
                        code: res.statusCode,
                        method: req.method,
                        message: 'Yeah..refesh token sucessfuly',
                        token: {
                            secret: refeshToken
                        }
                    }
                });

            } else {

                msg.error('error', 404, {

                    response: {

                        status: 'error',
                        code: 404,
                        method: req.method,
                        message: 'Oops..refesh token failed'
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

module.exports = { RefeshTokenController };