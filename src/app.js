import express from 'express'
import prodsRouter from './routes/products.routes.js'
import cartsRouter from './routes/carts.routes.js'
import __dirname from './utils.js'
import handlebars from 'express-handlebars'
import viewsRouter from './routes/views.router.js'
import { Server } from 'socket.io'
import { ProductManager } from './ProductManager.js'

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

const io = new Server(httpS)

io.on('connection',(socket) => { 
    socket.on('delete', async (msg) => {
        const pid = msg
        await manager.deleteProduct(pid)
        const prodList = await manager.getProducts()
        io.emit('delete',prodList)
    })
    socket.on('update',async (msg) => {
        if (msg) {
            const product = msg
            manager.addProduct(product)
            const currList = await manager.getProducts()
            io.emit('update', currList)
        } else {
            console.log('error en el producto')
        }
    }) 
})


    