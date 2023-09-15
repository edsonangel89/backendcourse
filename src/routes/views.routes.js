import { Router } from 'express'
import { productModel } from '../models/products.models.js'

const router = Router()

router.get('/', async (req, res) => {
    try {
        const productsList = await productModel.find()
        res.status(200).render('home', { 
            productsList,
            title: 'Products',
        })
    }
    catch (error) {
        res.status(400).send('Error en la consulta de los productos')
    }
})

router.get('/realtimeproducts', async (req, res) => {
    try {
        const productsList = await productModel.find()
        res.status(200).render('realTimeProducts', {
            productsList,
            title: 'Real Time'
        })
    }
    catch (error) {
        res.status(400).send('Error en la consulta de los productos')
    }
})

router.post('/realtimeproducts', async (req, res) => {
    const { title, description, code, price, stock, category } = req.body
    try {
        const newProduct = await productModel.create({ title, description, code, price, stock, category })
        const productsList = await productModel.find()
        res.status(200).render('realTimeProducts', {
        productsList,
        title: 'Real Time',
        })
    }
    catch (error) {
        res.status(400).send('Error al agregar el producto ' + error)
    }
})

router.post('/realtimeproducts/id', async (req, res) => {
    const { pid } = req.body
    if (pid) {
        try {
            const deletedProduct = await productModel.findByIdAndDelete(pid)
            const productsList = await productModel.find()
            res.status(200).render('realTimeProducts', {
                productsList,
                title: 'Real Time'
            })
        }
        catch (error) {
            res.status(400).send('Error al eliminar el producto ' + error)
        }
    }
})

export default router