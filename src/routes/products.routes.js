import { Router } from 'express'
import { productModel } from '../models/products.models.js'
import { getProducts,getProductId } from '../controllers/products.controller.js'


const productsRouter = Router()

productsRouter.get('/', getProducts)
productsRouter.get('/:pid', getProductId)

productsRouter.post('/', async (req, res) => {
    const { title, description, code, price, stock, category } = req.body
    try {
        const productAdded = await productModel.create({ title, description, code, price, stock, category })  //BUILD A NEW DOCUMMENT
        console.log('Producto agregado')
        res.status(200).send('Producto agregado\n' + productAdded)
    }
    catch (error) {
        console.log('Error al agregar producto')
        res.status(400).send('Error al agregar producto\n' + error)
    }
})

productsRouter.put('/:pid', async (req, res) => {
    const { pid } = req.params
    const  { title, description, code, price, status, stock, category } = req.body
    try {
        const productUpdated = await productModel.findByIdAndUpdate(pid, { title, description, code, price, status, stock, category })  //READ AND UPDATE AN EXISTING DOCUMENT
        res.status(200).send('Producto actualizado\n' + productUpdated)
    }
    catch (error) {
        res.status(400).send('Error al actualizar el producto\n' + error)
    }
})

productsRouter.delete('/:pid', async (req, res) => {
    const { pid } = req.params
    try {
        const productDeleted = await productModel.findByIdAndDelete(pid)    //READ AND DELETE AN EXISTING DOCUMENT
        res.status(200).send('Producto borrado')
    }
    catch (error) {
        res.status(400).send('Error al borrar el producto\n' + error)
    }
})

export default productsRouter