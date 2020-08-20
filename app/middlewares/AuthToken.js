const { Module } = require('configs/Module')
const jwt = new Module().jwt()
const { CustomeMessage } = require('helpers/customeMessage')

module.exports = (req, res, next) => {
  // function custome message
  const msg = new CustomeMessage(res)
  try {
    // function get token from headers
    const token = req.headers.authorization.split(' ')[1]
    // function check token is ready
    const decoded = jwt.verify(token, process.env.SECRET)
    if (decoded) {
      // return next if true
      return next()
    }
  } catch (err) {
    //msg if token failed or expaired
    msg.error(401, {
      response: {
        status: res.statusCode,
        method: req.method,
        url: req.originalUrl,
        message: `Oops..Unauthorized access, please give valid token`
      }
    })
  }
}
