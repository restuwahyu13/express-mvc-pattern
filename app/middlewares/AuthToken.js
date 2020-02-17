const { Module } = require('../../configs/Module');
const jwt = new Module().jwt();
const { CustomeMessage } = require('../helpers/customeMessage');
module.exports = (req, res, next) => {

    // function get token from headers
    const token = req.headers.authorization.split(' ')[1];
    // function custome message
    const msg = new CustomeMessage(res);
    // function check token is ready
    jwt.verify(token, process.env.SECRET, (err, decode) => {

        if (!decode) {

            //msg if token failed or expaired
            msg.error('error', 401, {

                response: {

                    status: 'error',
                    code: 401,
                    method: req.method,
                    url: req.originalUrl,
                    message: `Oops..Unauthorized access, please give valid token`
                }
            });

        } else {

            // return next if true
            return next();
        }
    });
}