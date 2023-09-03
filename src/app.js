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
    socket.on('deleteProduct', async (msg) => {
        const pid = msg
        manager.deleteProduct(pid)
        io.emit('delete',msg)
    })
    socket.on('update',(msg) => {

        if (msg) {
            const product = msg
            const newProduct = manager.addProduct(product)
            io.emit('update', newProduct)
        } else {
            console.log('error en el producto')
        }
    }) 
})


    