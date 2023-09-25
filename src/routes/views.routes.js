import { Router } from 'express'
import { productModel } from '../models/products.models.js'
import { userModel } from '../models/users.models.js'

const router = Router()

const auth = (req, res, next) => {
    if (req.session.role == 'admin') {
        next()
    }
    else {
        console.log(req.session.role)
        res.status(403).send('No tienes acceso a este recurso')
    }
}

router.get('/', async (req, res) => {
    try {
        const products = await productModel.find()
        const user = await userModel.findOne({})
        console.log(req.session.role)
        if (req.session.login) {
            if (req.session.role == 'admin') {
                res.status(200).render('realTimeProducts', { 
                    title: 'Real Time',
                    productsList: products
                })
            }
            else {
                res.status(200).render('home', {
                    title: 'Home',
                    productsList: products
                })
            }
        }
        else {
            res.status(200).render('loginlogout', { 
            title: 'Login'
            })
        }  
    }
    catch (error) {
        res.status(400).send('Error en la consulta de los productos')
    }
})
router.get('/realtimeproducts', auth, async (req, res) => {
    try {
        const productsList = await productModel.find()
        res.status(200).render('realTimeProducts', {
            productsList,
            title: 'Real Time'
        })}
    
    catch (error) {
        res.status(400).send('Error en la consulta de los productos')
    }
})

router.post('/realtimeproducts', auth, async (req, res) => {
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

router.post('/realtimeproducts/id',auth, async (req, res) => {
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