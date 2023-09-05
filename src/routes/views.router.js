import { Router } from 'express'
import { ProductManager } from '../ProductManager.js'

const router = Router()
const manager = new ProductManager()

router.get('/', async (req, res) => {
    const prods = await manager.getProducts()
    res.status(200).render('home',{
        prods,
        title: 'Products',
        script: 'index.js'
    })
})

router.get('/realtimeproducts', async (req, res) => {
    const prods = await manager.getProducts()
    res.status(200).render('realTimeProducts',{
        prods,
        title: 'Real Time',
        script: 'realtimeproducts.js'
    })
})

export default router