import {Router} from 'express'
import {ProductManager,Product} from '../ProductManager.js'


const router = Router()
const manager = new ProductManager()


/*router.get('/', async (req, res) => {
    res.render('home',{})
})*/

router.get('/realtimeproducts', (req, res) => {
    res.render('realTimeProducts', {})
})

export default router