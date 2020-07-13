const router = require('express').Router()
const user = require('./user')
const produk = require('./produk')
const cart = require('./cart')
const produkController = require('../Controller/ProdukController')
const userController = require('../Controller/userController')
const registerController = require('../Controller/registerController')
const { route } = require('./user')
const loginController = require('../Controller/loginController')
const cartController = require('../Controller/cartController')

const authentication = require('../middleware/authentication')
const authorization = require('../middleware/authorization')
// router.post('/', produkController.createProduk)
var request = require("request");



router.use(function (req, res, next) {
    res.locals.token = req.signedCookies.token;
    next();
});
router.get('/', (req, res) => {
    console.log(req.query.nama)
    res.render('home')
})


router.use('/user', user)
router.use('/produk', produk)
router.use('/cart', cart)



router.use('/login', loginController.login)



router.get('/register', registerController.register)
router.get('/login', loginController.login)
router.get('/logout', loginController.logout)
router.get('/addCart/:id', authentication, cartController.cartPost)
router.get('/checkout', authentication, cartController.Ongkir)



router.get('/contoh_api', (req, res) => {
    var options = {
        method: 'POST',
        url: 'https://api.rajaongkir.com/starter/cost',
        // headers: { key: 'your-api-key', 'content-type': 'application/x-www-form-urlencoded' },
        form: { origin: '399', destination: req.query.tujuan, weight: req.query.berat, courier: 'jne', key: '7d117e0fbc6d0dc9d61c119046e85af6' }
    };
    request(options, function (error, response, body) {
        if (error) throw new Error(error);
        res.json(JSON.parse(body))
        // console.log(body);
    });
})



router.get('/HomeLogin', (req, res) => {
    res.render('YaItulah')
})

router.get('/admin', produkController.Produk)

router.get('/addproduk', produkController.renderFormProduct)
router.get('/list', authentication, produkController.findAll)
router.get('/:id', authentication, cartController.deleteCart)

router.get('/aku/:id', produkController.deleteProduk)
// List






router.get('/update_produk/:id', produkController.renderUpdate)
// Detail
router.get('/detail_produk/:id', produkController.detailProduk)
router.get('/list_merk/:merk', produkController.findMerk)




router.get('/detail_admin/:id', produkController.detailAdmin)




module.exports = router