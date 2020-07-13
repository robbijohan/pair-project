const { verifyToken } = require('../helper/jwt')
const { User } = require('../models')

function authentication(req, res, next) {
    const decode = verifyToken(req.cookies.token)
    User.findByPk(decode.id)
        .then(data => {
            if (data) {
                req.user = decode
                next()
            } else {
                res.redirect('/login')
            }
        })
        .catch(err => {
            next(err)
        })
}
module.exports = authentication