import { Router } from 'express'
import { productModel } from '../models/products.models.js'
import { userModel } from '../models/users.models.js'

const router = Router()

router.get('/', async (req, res) => {
        res.status(200).render('loginlogout', { 
        title: 'Login'
        })
    }    
)
router.get('/home', async (req, res) => {
    try {
        const products = await productModel.find()
        const user = await userModel.findOne({_id: req.session.passport.user})
        if (user) {
            if (user.role == 'user') {
                res.status(200).render('home', {
                    title: 'Home',
                    productsList: products,
                    name: user.fname
                })
            }
        }
    else {
        res.status(404).send('Usuario no encontrado')
    }
    }
    catch(error) {
        res.status(400).send('Error en vista home\n' + error)
    }
})
router.get('/realtimeproducts', async (req, res) => {
    try {
        const user = await userModel.findOne({_id: req.session.passport.user})
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