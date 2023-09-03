import {Router} from 'express'
import {CartManager, Cart} from '../CartManager.js'

const cartsRouter = Router()
const cManager = new CartManager()

cartsRouter.post('/', async (req, res) => {

    const cart = new Cart()
    cManager.addCart(cart)
    res.status(200).send("Carrito agregado")

})

cartsRouter.get('/:cid', async (req, res) => {

    const cartId = parseInt(req.params.cid)
    
    res.status(200).send(await cManager.getCartById(cartId))

})

cartsRouter.post('/:cid/product/:pid', async (req, res) => {

    const cid = parseInt(req.params.cid)
    const pid = parseInt(req.params.pid)

    await cManager.addProductById(cid,pid)
    res.status(200).send()

})

export default cartsRouter