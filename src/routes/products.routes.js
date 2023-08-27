import {Router} from 'express'
import {ProductManager} from '../ProductManager.js'
import {Product} from '../ProductManager.js'

const prodsR = Router()
const manager = new ProductManager()

prodsR.get('/', async (req, res) => {

    const lim = req.query.limit

    if (lim) {
        res.status(200).send(await manager.getProducts(lim))
    } else {
        res.status(200).send(await manager.getProducts())
    }

})

prodsR.get('/:pid', async (req, res) => {

    const productId = Number(req.params.pid)
    
    res.status(200).send(await manager.getProductById(productId))
})

prodsR.post('/', (req, res) => {

    const prod = new Product()

    manager.addProduct(prod)
    res.status(200).send("Producto agregado")
    
})

prodsR.put('/:pid', async (req, res) => {

    const pid = parseInt(req.params.pid)
    const {title,description,code,price,status,stock,category,thumbnails} = req.body

    //console.log(pid)
    res.send("Producto actualizado")
    await manager.updateProduct(pid,title,description,code,price,status,stock,category,thumbnails)

})

prodsR.delete('/:pid', async (req, res) => {

})

export default prodsR