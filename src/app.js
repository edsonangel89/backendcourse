import express from 'express'
import {ProductManager} from './ProductManager.js'
import prodsR from './routes/products.routes.js'
import cartsR from './routes/carts.routes.js'

const app = express()
const manager = new ProductManager()

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use('/api/products',prodsR)
app.use('/api/carts',cartsR)

app.listen(8080,() => console.log("Server on port 8080"))

