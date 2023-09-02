import {Router} from 'express'
import {ProductManager,Product} from '../ProductManager.js'


const router = Router()
const manager = new ProductManager()


router.get('/', async (req, res) => {
    const prods = await manager.getProducts()
    res.render('home',{prods})
})

router.get('/realtimeproducts', async (req, res) => {
    const prods = await manager.getProducts()
    res.render('realTimeProducts',{prods})
})

export default router