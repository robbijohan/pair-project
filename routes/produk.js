const router = require('express').Router()
const produkController = require('../Controller/ProdukController')
const authentication = require('../middleware/authentication')
const authorization = require('../middleware/authorization')


router.get('/', produkController.findAll)

router.post('/', authentication, produkController.createProduk)
router.put('/:id', authentication, produkController.updateProduk)
router.delete('/:id', authentication, produkController.deleteProduk)


router.get('/:id', produkController.detailProduk)


module.exports = router