import { Router } from 'express'
import { productModel } from '../models/products.models.js'
import { userModel } from '../models/users.models.js'

const router = Router()

/*const auth = (req, res, next) => {
    if (req.session.role == 'admin') {
        next()
    }
    else {
        res.status(403).send('Acceso denegado')
    }
}*/

router.get('/', async (req, res) => {
    try {
        const products = await productModel.find()
        const user = await userModel.findOne({email: req.session.email})
        if (req.session.login) {
            if (req.session.role == 'admin') {
                res.status(200).render('realTimeProducts', { 
                    title: 'Real Time',
                    productsList: products,
                    name: user.fname
                })
            }
            else {
                res.status(200).render('home', {
                    title: 'Home',
                    productsList: products,
                    name: user.fname
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
router.get('/realtimeproducts', async (req, res) => {
    try {
        const user = await userModel.findOne({email: req.session.email})
        const productsList = await productModel.find()
        res.status(200).render('realTimeProducts', {
            productsList,
            title: 'Real Time',
            name: user.fname
        })}
    
    catch (error) {
        res.status(400).send('Error en la consulta de los productos')
    }
})

router.post('/realtimeproducts', async (req, res) => {
    const { title, description, code, price, stock, category } = req.body
    try {
        const user = await userModel.findOne({email: req.session.email})
        await productModel.create({ title, description, code, price, stock, category })
        const productsList = await productModel.find()
        
        res.status(200).render('realTimeProducts', {
        productsList,
        title: 'Real Time',
        name: user.fname
        })
    }
    catch (error) {
        res.status(400).send('Error al agregar el producto' + error)
    }
})

router.post('/realtimeproducts/id', async (req, res) => {
    const { pid } = req.body
    if (pid) {
        try {
            const user = await userModel.findOne({email: req.session.email})
            await productModel.findByIdAndDelete(pid)
            const productsList = await productModel.find()
            
            res.status(200).render('realTimeProducts', {
                productsList,
                title: 'Real Time',
                name: user.fname
            })
        }
        catch (error) {
            res.status(400).send('Error al eliminar el producto ' + error)
        }
    }
})

export default router