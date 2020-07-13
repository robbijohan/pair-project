const { Cart } = require('../models')
const { Produk } = require('../models')
const { verifyToken } = require('../helper/jwt')
const { verify } = require('jsonwebtoken')
const axios = require('axios');

class cartController {
    static createCart(req, res, next) {
        const UserId = req.user.id
        const ProdukId = req.params.id
        Cart.create({ UserId, ProdukId })
            .then(data => {
                res.render('addcart')
            })
            .catch(err => {
                res.status(400).json(err)
            })
    }

    static createDulu(req, res, next) {
        Produk.findOne({ id: req.params.id })
            .then(data => {
                res.render('addcart', { data })
            })
            .catch(err => {
                res.redirect(`/list, ${req.params.id}`)
            })
    }
    static cartPost(req, res) {
        let UserId
        let data_user = verifyToken(req.cookies.token)

        UserId = data_user.id
        Cart.create({
            jumlahBarang: req.body.jumlahBarang,
            totalHarga: req.body.totalHarga,
            ProdukId: req.params.id,
            UserId: data_user.id,
        })

            .then(data => {
                res.redirect(`/list`)
            })
            .catch(err => {
                res.status(400).json(err)
            })
    }



    static updateCart(req, res, next) {
        const UserId = req.user.id
        const ProdukId = req.params.id
        const { id } = req.params
        Cart.update({ UserId, ProdukId }, { where: { id } })
            .then(data => {
                res.status(200).json('msg: berhasil diupdate')
            })
            .catch(err => {
                res.status(400).json(err)
            })
    }
    static deleteCart(req, res, next) {
        const UserId = req.user.id
        const ProdukId = req.params.id
        const { id } = req.params
        Cart.destroy({ where: { id } })
            .then(data => {
                res.redirect('/cart')
            })
            .catch(err => {
                res.status(400).json(err)
            })
    }
    static read(req, res, next) {
        let data_user = verifyToken(req.cookies.token)
        let UserId = data_user.id
        Cart.findAll({ where: { UserId }, include: { model: Produk } })
            .then(cart => {
                console.log(cart)
                res.render('Cart', { cart })
            })
            .catch(err => {
                res.status(400).json(err)
            })
    }




    static Ongkir(req, res, next) {
        let data_user = verifyToken(req.cookies.token)
        let UserId = data_user.id
        Cart.findAll({ where: { UserId }, include: { model: Produk } })
            .then(cart => {
                let dataCart = cart
                return axios({
                    method: 'GET',
                    url: 'https://api.rajaongkir.com/starter/city?province=10',
                    headers: { key: '7d117e0fbc6d0dc9d61c119046e85af6' }
                }).then(({ data }) => {
                    console.log(data)
                    // res.json(data)
                    res.render('checkout', { data_user, dataCart, data })
                })
                    .catch(err => {
                        res.status(400).json(err)
                    })
            })

    }
}


module.exports = cartController