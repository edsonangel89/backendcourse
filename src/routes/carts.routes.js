import { Router } from 'express'
import { createCart, 
        getCartById, 
        addProduct, 
        deleteProduct, 
        deleteCart, 
        updateProductInCart, 
        updateCart,
        buy 
    } from '../controllers/carts.controller.js'

const cartsRouter = Router()

cartsRouter.post('/', createCart)
cartsRouter.get('/:cid', getCartById)
cartsRouter.post('/:cid/product/:pid', addProduct)
cartsRouter.get('/:cid/product/:pid', deleteProduct)
cartsRouter.get('/:cid/buy', buy)
cartsRouter.delete('/:cid/product/:pid', deleteProduct)
cartsRouter.delete('/:cid', deleteCart)
cartsRouter.put('/:cid/product/:pid', updateProductInCart)
cartsRouter.put('/:cid', updateCart)

export default cartsRouter