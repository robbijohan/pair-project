const { login } = require('../models')

class loginController {
    static login(req, res) {
        res.render('login')
    }
    static logout(req, res) {
        res.clearCookie('token');
        res.redirect('/')
    }
}

module.exports = loginController