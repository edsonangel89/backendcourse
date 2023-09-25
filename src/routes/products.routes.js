import { Router } from 'express'
import { productModel } from '../models/products.models.js'

const productsRouter = Router()

const auth = (req, res, next) => {
    if (req.session.role == 'admin') {
        console.log(req.session.role)
        next()
    }
    else {
        console.log(req.session.role)
        res.status(403).send('Acceso denegado')
    }
}

productsRouter.get('/', auth, async (req, res) => {
    const { limit, page, sort, category } = req.query
    try {
        if (limit && page && sort && category) {
            const products = await productModel.paginate({category: category},{limit: limit,page: page,sort: {price: sort}})
            res.status(200).send(products)
        }
        else if (limit && page && sort) {
            const products = await productModel.paginate({},{limit: limit,page: page,sort: {price: sort}})
            res.status(200).send(products)
        }
        else if (limit && page && category) {
            const products = await productModel.paginate({category: category},{limit: limit,page: page})
            res.status(200).send(products)
        }
        else if (limit && sort && category) {
            const products = await productModel.paginate({category: category},{limit: limit,sort: {price: sort}})
            res.status(200).send(products)
        }
        else if (page && sort && category) {
            const products = await productModel.paginate({category: category},{page: page,sort: {price: sort}})
            res.status(200).send(products)
        }
        else if (limit && page) {
            const products = await productModel.paginate({},{limit: limit,page: page})
            res.status(200).send(products)
        }
        else if (page && sort) {
            const products = await productModel.paginate({},{page: page,sort: {price: sort}})
            res.status(200).send(products)
        }
        else if (limit && sort) {
            const products = await productModel.paginate({},{limit: limit,sort: {price: sort}})
            res.status(200).send(products)
        }
        else if (limit && category) {
            const products = await productModel.paginate({category: category},{limit: limit})
            res.status(200).send(products)
        }
        else if (sort && category) {
            const products = await productModel.paginate({category: category},{sort: {price: sort}})
            res.status(200).send(products)
        }
        else if (sort) {
            const products = await productModel.paginate({},{sort: {price: sort}})
            res.status(200).send(products)
        }
        else if (category) {
            const products = await productModel.paginate({category: category})
            res.status(200).send(products)
        }
        else if (limit) {
            const products = await productModel.paginate({},{limit: limit})
            res.status(200).send(products)
        }
        else if (page) {
            const products = await productModel.paginate({},{page: page})
            res.status(200).send(products)
        }
        else {
            const products = await productModel.paginate()
            res.status(200).send(products)
        }
    }
    catch(error) {
        res.status(400).send('Error al consultar productos\n' + error)
    }
})

productsRouter.get('/:pid', auth, async (req, res) => {
    const { pid } = req.params
    try {
        const productById = await productModel.findById(pid)  //READ DOCUMENT BY ID
        res.status(200).send(productById)
    }
    catch (error) {
        res.status(400).send('Error al consultar archivo por ID\n' + error)
    }
})

productsRouter.post('/', auth, async (req, res) => {
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

productsRouter.put('/:pid', auth, async (req, res) => {
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

productsRouter.delete('/:pid', auth, async (req, res) => {
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