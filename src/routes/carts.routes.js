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
        //console.log(cartById)
        res.status(200).send(JSON.stringify(cartById))
    }
    catch (error) {
        res.status(400).send('Error en la consulta del carrito \n' + error)
    }
})
cartsRouter.post('/:cid/product/:pid', async (req, res) => {
    const { cid, pid } = req.params
    const { quantity } = req.body
    try {
        const cart = await cartModel.findById(cid) 
        if (cart) {
            const product = await productModel.findById(pid)
            if (product) {
                const prod = cart.products.find(prod => prod.id_product == pid)
                if (prod) {
                    cart.products.quantity = quantity
                    await cartModel.findByIdAndUpdate(cid, cart)
                }
                else {
                    cart.products.push({id_product: pid, quantity: quantity})
                    await cartModel.findByIdAndUpdate(cid, cart)
                }
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
        res.status(400).send('Error al agregar producto al carrito \n' + error)
    }
})
cartsRouter.delete('/:cid/product/:pid', async (req, res) => {
    const { cid,pid } = req.params
    try {
        const cart = await cartModel.findById(cid)
        if (cart) {
            const products = cart.products
            const product = await productModel.findById(pid)
            if (product) {
                const newProducts = products.filter(prod => prod.id_product._id != pid)
                await cartModel.findByIdAndUpdate(cid, {products: newProducts})
                res.status(200).send(newProducts)
            }
            else {
                res.status(404).send('El producto no esta en el carrito')
            }
        }
        else {
            res.status(404).send('Carrito no encontrado')
        }
    }
    catch(error) {
        res.status(400).send('Error en la eliminacion del product\n' + error)
    }
})
cartsRouter.delete('/:cid', async (req, res) => {
    const { cid } = req.params
    try {
        const cart = await cartModel.findById(cid)
        if (cart) {
            cart.products = []
            await cartModel.findByIdAndUpdate(cid, cart)
            res.status(200).send('Productos eliminados')
        }
        else {
            res.status(404).send('Carrito no encontrado')
        }
    }
    catch(error) {
        res.status(400).send('Error al eliminar productos\n' + error)
    }
})
cartsRouter.put('/:cid/product/:pid', async (req, res) => {
    const { cid, pid } = req.params
    const { quantity } = req.body
    try {
        const cart = await cartModel.findById(cid)
        if (cart) {
            const product = cart.products.find(prod => prod.id_product._id == pid)
            if (product) {
                product.quantity = quantity
                await cartModel.findByIdAndUpdate(cid, cart)
                res.status(200).send('Producto actualizado')
            }
            else {
                res.status(404).send('Producto no encontrado')
            }
        }
        else {
            res.status(404).send('Carrito no encontrado')
        }
    }
    catch(error) {
        res.status(400).send('Error de actualizacion producto\n' + error)
    }
})
cartsRouter.put('/:cid', async (req, res) => {
    const { cid } = req.params
    const productsArray = req.body
    try {
        const cart = await cartModel.findById(cid)
        if (cart) {
            productsArray.forEach(element => {
                const addedProduct = cart.products.find(prod => prod.id_product._id == element.id_product) 
                if (addedProduct) {
                    addedProduct.quantity = element.quantity
                }
                else {
                    cart.products.push(element)
                }
            })
            await cartModel.findByIdAndUpdate(cid, cart)
            res.status(200).send(cart)
        }
        else {
            res.status(404).send('Carrito no encontrado')
        }
    }
    catch(error) {
        res.status(400).send('Error de actualizacion de carrito\n' + error)
    }
})

export default cartsRouter