import {Router} from 'express'
import {ProductManager,Product} from '../ProductManager.js'
import fs from 'fs'

const router = Router()
const manager = new ProductManager()

router.get('/', async (req, res) => {
    const prods = await manager.getProducts()
    res.status(200).render('home',{
        prods,
        script: 'index.js'
    })
})

router.get('/realtimeproducts', async (req, res) => {
    const prods = await manager.getProducts()
    res.status(200).render('realTimeProducts',{
        prods,
        script: 'realtimeproducts.js',
        cdn: '"https://ajax.googleapis.com/ajax/libs/jquery/3.6.4/jquery.min.js"'
    })
})

router.post('/realtimeproducts', async (req, res) => {
    const file = JSON.parse(await fs.promises.readFile('./products.json','utf-8'))
    if (file.length == 0) {
        const currId = 0
        const {title,description,code,price,status,stock,category,thumbnail} = req.body
        const thumb = []
        const pric = parseInt(price)
        const sto = parseInt(stock)
        thumb.push(thumbnail)
        const prod = new Product(currId,title,description,code,pric,status,sto,category,thumb)
        if (manager.addProduct(prod) === 'ERROR') {
            console.log('Este producto ya existe')
            const prods = await manager.getProducts()
            //This line was modified for the filesystem branch, the status response should be 400
            res.status(200).render('realTimeProducts',{prods})
        } else {
            console.log('Producto agregado exitosamente')
            const prods = await manager.getProducts()
            res.status(200).render('realTimeProducts',{prods})
        }
    } else {
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
            //This line was modified for the filesystem branch, the status response should be 400
            res.status(200).render('realTimeProducts',{prods})
        } else {
            console.log('Producto agregado exitosamente')
            const prods = await manager.getProducts()
            res.status(200).render('realTimeProducts',{prods})
        }
    }  
})

export default router