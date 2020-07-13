const { register } = require('../models')

class registerController {
    static register(req, res) {
        res.render('register')

    }
}

module.exports = registerController