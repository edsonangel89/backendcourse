import {Router} from 'express'
import {CartManager, Cart} from '../CartManager.js'

const cartsP = Router()
const cManager = new CartManager()

cartsP.post('/', async (req, res) => {

    const cart = new Cart()
    cManager.addCart(cart)
    res.status(200).send("Carrito agregado")

})

cartsP.get('/:cid', async (req, res) => {

    const cartId = parseInt(req.params.cid)
    
    res.status(200).send(await cManager.getCartById(cartId))

})

cartsP.post('/:cid/product/:pid', async (req, res) => {

    const cid = parseInt(req.params.cid)
    const pid = parseInt(req.params.pid)

    await cManager.addProductById(cid,pid)
    res.status(200).send()

})

export default cartsP