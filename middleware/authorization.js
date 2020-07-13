const { Produk } = require('../models')

const authorization = (req, res, next) => {
    const userId = req.user.id
    const { id } = req.params
    Produk.findByPK(id)
    .then(data => {
        if(data.userId == userId){
            next()
        } else {
            next({ status: 400, msg: "ini bukan akunmu!"})
        }
    })
    .catch(err => {
        next(err)
    })
}

module.exports = authorization