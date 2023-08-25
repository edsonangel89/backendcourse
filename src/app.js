import express from 'express'
import {ProductManager} from './ProductManager.js'

const app = express()
const manager = new ProductManager()

app.use(express.urlencoded({extended:true}))

app.get('/products',async (req, res) => { 
    const lim = req.query.limit

    if (lim) {
        res.status(200).send(await manager.getProducts(lim))
    } else {
        res.status(200).send(await manager.getProducts())
    }

})

app.get('/products/:pid',async (req, res) => {
    const productId = Number(req.params.pid)
    
    res.status(200).send(await manager.getProductById(productId))

})

app.listen(8080,() => console.log("Server on port 8080"))

