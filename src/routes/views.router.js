import {Router} from 'express'
import {ProductManager,Product} from '../ProductManager.js'
import fs from 'fs'

const router = Router()
const manager = new ProductManager()

router.get('/', async (req, res) => {
    const prods = await manager.getProducts()
    res.status(200).render('home',{prods})
})

router.get('/realtimeproducts', async (req, res) => {
    const prods = await manager.getProducts()
    res.status(200).render('realTimeProducts',{prods})
})

router.post('/realtimeproducts', async (req, res) => {
    const file = JSON.parse(await fs.promises.readFile('./products.json','utf-8'))
    const currId = file[file.length - 1].id
    const {title,description,code,price,status,stock,category,thumbnail} = req.body
    const thumb = []
    const pric = parseInt(price)
    const sto = parseInt(stock)
    thumb.push(thumbnail)
    const prod = new Product(currId,title,description,code,pric,status,sto,category,thumb)
    if (manager.addProduct(prod) === 'ERROR') {
        console.log('Este producto ya existe')
        const prods = await manager.getProducts()
        res.status(400).render('realTimeProducts',{prods})
    } else {
        console.log('Producto agregado exitosamente')
        const prods = await manager.getProducts()
        res.status(200).render('realTimeProducts',{prods})
    }
})

export default router