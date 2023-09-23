import { Router } from 'express'
import { productModel } from '../models/products.models.js'

const router = Router()

const login = (req, res, next) => {
    if (req.session.login) {
        next()
    }
    else {
        res.status(400).send('Usuario deslogueado')
    }
}

router.get('/', async (req, res) => {
    try {
        if (req.session.login) {
            res.status(200).render('login', { 
            title: 'Login',
            
            })
        }
        else {
            res.status(200).render('login', { 
            title: 'Login'
            })
        }
        
    }
    catch (error) {
        res.status(400).send('Error en la consulta de los productos')
    }
})

const auth = (req, res, next) => {
    if (req.session.role == 'admin') {
        next()
    }
    else {
        res.status(403).send('No tienes acceso a este recurso')
    }
}

router.get('/realtimeproducts', auth, async (req, res) => {
    try {
        if (req.session.role == 'admin') {
            console.log(req.session.email)
            const productsList = await productModel.find()
            res.status(200).render('realTimeProducts', {
                productsList,
                title: 'Real Time'
            })
        }
        else {
            res.status(403).send('No tienes acceso a este recurso')
        }
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