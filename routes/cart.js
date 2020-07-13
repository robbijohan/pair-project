const router = require('express').Router()
const cartController = require('../Controller/cartController')
const authentication = require('../middleware/authentication')
const authorization = require('../middleware/authorization')

router.get('/', authentication, cartController.read)
// router.post('/:id', authentication, cartController.createCart1)
router.put('/:id', authentication, authorization, cartController.updateCart)
router.delete('/:id', authentication, authorization, cartController.deleteCart)



module.exports = router

