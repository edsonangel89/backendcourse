import {Router} from 'express'
import {ProductManager,Product} from '../ProductManager.js'
import fs from 'fs'

const prodsRouter = Router()
const manager = new ProductManager()

prodsRouter.get('/', async (req, res) => {
    const lim = req.query.limit
    if (lim) {
        res.status(200).send(await manager.getProducts(lim))
    } else {
        res.status(200).send(await manager.getProducts())
    }
})

prodsRouter.get('/:pid', async (req, res) => {
    const productId = parseInt(req.params.pid)
    res.status(200).send(await manager.getProductById(productId))
})

prodsRouter.post('/', async (req, res) => {
    const file = JSON.parse(await fs.promises.readFile('./products.json','utf-8'))
    const currId = file[file.length - 1].id
    const {title,description,code,price,status,stock,category,thumbnail} = req.body
    const thumb = []
    const pric = parseInt(price)
    const sto = parseInt(stock)
    thumb.push(thumbnail)
    const prod = new Product(currId,title,description,code,pric,status,sto,category,thumb)
    manager.addProduct(prod)
    const prods = await manager.getProducts()
    console.log('Producto agregado')
    res.status(200).render('realTimeProducts',{prods})
})

prodsRouter.put('/:pid', async (req, res) => {
    const pid = parseInt(req.params.pid)
    const {title,description,code,price,status,stock,category,thumbnails} = req.body
    await manager.updateProduct(pid,title,description,code,price,status,stock,category,thumbnails)
    res.status(200).send("Producto actualizado")
})

prodsRouter.delete('/:pid', async (req, res) => {
    const pid = parseInt(req.params.pid)
    await manager.deleteProduct(pid)
    res.status(200).send("Producto borrado")
})

export default prodsRouter