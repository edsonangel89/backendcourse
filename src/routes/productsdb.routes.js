import { Router } from 'express'
import { productModel } from '../models/products.models.js'

const productDbRouter = Router()

productDbRouter.get('/', async (req, res) => {
    try {
        const products = await productModel.find()
        res.status(200).render('home',{products})
    }
    catch (error){
        res.status(400).send('Error al consultar productos')
    }
})

productDbRouter.post('/',async (req, res) => {
    const {title,description,code,price,status,stock,category,thumbnail} = req.body
    try {
        const response = await productModel.create({title,description,code,price,status,stock,category,thumbnail})
        if (response) {
            const products = await productModel.find()
            res.status(200).render('realTimeProducts',{products})
        }
    }
    catch (error) {
        const products = await productModel.find()
        res.status(400).render('realTimeProducts',{products})
    }
})

productDbRouter.get('/id/:id', async (req, res) => {
    const {id} = req.params
    try {
        const product = await productModel.findById(id)
        res.status(200).render('home',{product})
    }
    catch (error){
        res.status(400).send('Error al consultar producto')
    }
})

productDbRouter.put('/id/:id', async (req, res) => {
    const {id} = req.params
    const {title,description,code,price,status,stock,category,thumbnail} = req.body
    try {
        await productModel.findByIdAndUpdate(id,{title,description,code,price,status,stock,category,thumbnail})
        const products = await productModel.find()
        res.status(200).send('Producto actualizado')
    }
    catch (error){
        res.status(400).send('Error al consultar producto')
    }
})

productDbRouter.delete('/id/:id', async (req, res) => {
    const {id} = req.params
    try {
        await productModel.findByIdAndDelete(id)
        const products = await productModel.find()
        res.status(200).send('Producto eliminado')
    }
    catch (error){
        res.status(400).send('Error al consultar producto')
    }
})

productDbRouter.get('/realtimeproducts', async (req, res) => {
    try {
        const products = await productModel.find()
        res.status(200).render('realTimeProducts',{products})
    }
    catch (error) {
        res.status(400).send('Error al actualizar la lista de productos')
    }
})

productDbRouter.post('/realtimeproducts', async (req, res) => {
    const {title,description,code,price,status,stock,category,thumbnail} = req.body
    try {
        const response = await productModel.create({title,description,code,price,status,stock,category,thumbnail})
        if (response) {
            const products = await productModel.find()
            res.status(200).render('realTimeProducts',{products})
        }
    }
    catch (error) {
        const products = await productModel.find()
        res.status(400).send('Error al agregar el producto')
    }
})


export default productDbRouter