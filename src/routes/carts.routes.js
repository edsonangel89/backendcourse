import { Router } from 'express'
import { cartModel } from '../models/carts.models.js'
import { productModel } from '../models/products.models.js'

const cartsRouter = Router()

cartsRouter.post('/', async (req, res) => {
    try {
        const newCart = await cartModel.create({})
        res.status(200).send('Carrito creado')
    }
    catch (error) {
        res.status(400).send('Error al crear carrito \n' + error)
    }
})
cartsRouter.get('/:cid', async (req, res) => {
    const { cid } = req.params
    try {
        const cartById = await cartModel.findById(cid)
        res.status(200).send(cartById)
    }
    catch (error) {
        res.status(400).send('Error al consultar carrito \n' + error)
    }
})
cartsRouter.post('/:cid/product/:pid', async (req, res) => {
    const { cid, pid } = req.params
    try {
        const cart = await cartModel.findById(cid) 
        if (cart) {
            const product = await productModel.findById(pid)
            if (product) {
                cart.products.push(product)
                res.status(200).send('Producto agregado \n' + product)
            }
            else {
                res.status(404).send('Producto no encontrado')
            }
        }
        else {
            res.status(404).send('Carrito no encontrado')
        }
    }
    catch (error) {
        res.status(400).send('Error al agregar producto al carrito ' + error)
    }
})

export default cartsRouter