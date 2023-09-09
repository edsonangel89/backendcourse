import { Router } from 'express'
import { cartModel } from '../models/carts.models'

const cartsRouter = Router()

cartsRouter.post('/', async (req, res) => {
    try {
        const newCart = cartModel.create({ })
        res.status(200).send('Carrito creado ' + newCart)
    }
    catch (error) {
        res.status(400).send('Error al crear carrito ' + error)
    }
})

cartsRouter.get('/:cid', async (req, res) => {
    const { cid } = req.params
    try {
        const cartById = await cartModel.findById(cid)
        res.status(200).send(cartById)
    }
    catch (error) {
        res.status(400).send('Error al consultar carrito ' + error)
    }
    
})

cartsRouter.post('/:cid/product/:pid', async (req, res) => {
    const { cid } = req.params
    const { pid } = req.params
    try {
        const productAddedByIdCart = await cartModel.findByIdAndUpdate(cid,{ pid })
        res.status(200).send()
    }
    catch (error) {
        res.status(400).send('Error al agregar producto al carrito ' + error)
    }
})

export default cartsRouter