import { Router } from 'express'
import { productModel } from '../models/products.models.js'

const productsRouter = Router()

productsRouter.get('/', async (req, res) => {
    const { limit, page, sort, query } = req.query
    //const result = await productModel.paginate()
    //console.log(result)
    console.log(limit)
    console.log(page)
    console.log(sort)
    console.log(query)
    if (limit) {
        try {
            //const productsList = await productModel.find().limit(limit)
            const productsList = await productModel.paginate({},{limit: 1})
            res.status(200).send( productsList )
        }
        catch {
            res.status(400).send('No se puede mostrar la lista de productos')
        }
    }
    else {
        try {
            //const productsList = await productModel.find()
            const productsList = await productModel.paginate()
            res.status(200).send( productsList )
        }
        catch (error) {
            res.status(400).send('Error de consulta de productos ' + error)
        }
    }
})

productsRouter.get('/:pid', async (req, res) => {
    const { pid } = req.params
    try {
        const productById = await productModel.findById(pid)
        res.status(200).send(productById)
    }
    catch (error) {
        res.status(400).send('Error al consultar archivo pro ID ' + error)
    }
})

productsRouter.post('/', async (req, res) => {
    const { title, description, code, price, stock, category } = req.body
    try {
        const productAdded = await productModel.create({ title, description, code, price, stock, category })
        console.log('Product agregado')
        res.status(200).send('Producto agregado ' + productAdded)
    }
    catch (error) {
        console.log('Error al agregar producto')
        res.status(400).send('Error al agregar producto ' + error)
    }
})

productsRouter.put('/:pid', async (req, res) => {
    const { pid } = req.params
    const  { title, description, code, price, status, stock, category } = req.body
    try {
        const productUpdated = await productModel.findByIdAndUpdate(pid, { title, description, code, price, status, stock, category })
        res.status(200).send('Producto actualizado ' + productUpdated)
    }
    catch (error) {
        res.status(400).send('Error al actualizar el producto ' + error)
    }
})

productsRouter.delete('/:pid', async (req, res) => {
    const { pid } = req.params
    try {
        const productDeleted = await productModel.findByIdAndDelete(pid)
        res.status(200).send('Producto borrado')
    }
    catch (error) {
        res.status(400).send('Error al borrar el producto ' + error)
    }
})

export default productsRouter