import express from 'express'
import prodsRouter from './routes/products.routes.js'
import cartsRouter from './routes/carts.routes.js'
import __dirname from './utils.js'
import handlebars from 'express-handlebars'
import viewsRouter from './routes/views.router.js'
import {Server} from 'socket.io'
import { ProductManager,Product } from './ProductManager.js'
import fs from 'fs'
import productDbRouter from './routes/productsdb.routes.js'
import mongoose from 'mongoose'

const app = express()
const httpS = app.listen(8080,() => console.log("Server on port 8080"))
const manager = new ProductManager()

app.engine('handlebars',handlebars.engine())
app.set('views',__dirname + '/views')
app.set('view engine','handlebars')

app.use(express.static(__dirname + '/public'))
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use('/',viewsRouter)
app.use('/api/products',prodsRouter)
app.use('/api/carts',cartsRouter)
app.use('/api/db/products',productDbRouter)

const io = new Server(httpS)

mongoose.connect('mongodb+srv://edsonangel:Sabiduria89@cluster0.htyzerk.mongodb.net/?retryWrites=true&w=majority')
.then(() => console.log('BDD conectada'))
.catch(() => console.log('Error de conexion'))

io.on('connection',(socket) => { 

    socket.on('newProduct', async (prod) => {
        const producto = prod
        const file = JSON.parse(fs.readFileSync('./products.json','utf-8'))
        
        
        if (file.length > 0) {
            
            let currId = file[file.length - 1].id
            let prod = file.find(p => p.code === producto.code)
            if (prod) {
                console.log('Product already added')
            } else {
                const {title,description,code,price,stock,category,thumbnail} = producto
                const product = new Product(currId,title,description,code,price,stock,category,thumbnail)
                manager.addProduct(product)
                const prodList = await manager.getProducts()
                console.log('New product added')
            }

        } else {

            let currId = 0
            const {title,description,code,price,stock,category,thumbnail} = prod
            const product = new Product(currId,title,description,code,price,stock,category,thumbnail)
            manager.addProduct(product)
            io.emit('products', product)

        }
        
    } )

    socket.on('deleteProduct', async (msg) => {
        const pid = msg
        
        manager.deleteProduct(pid)

    })
    }
)


    