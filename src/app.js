import express, { application } from 'express'
import prodsRouter from './routes/products.routes.js'
import cartsRouter from './routes/carts.routes.js'
import __dirname from './utils.js'
import handlebars from 'express-handlebars'
import viewsRouter from './routes/views.routes.js'
import { Server } from 'socket.io'
import mongoose from 'mongoose'
import usersRouter from './routes/users.routes.js'
import messageRouter from './routes/messages.routes.js'
import { cartModel } from './models/carts.models.js'

const app = express()
const httpS = app.listen(8080,() => console.log("Server on port 8080"))

mongoose.connect('mongodb+srv://edsonangel:Sabiduria89@cluster0.htyzerk.mongodb.net/?retryWrites=true&w=majority')
.then(async () => {
    const results = await cartModel.findOne({_id: '6507545f45b29c619d696ab7'}).populate('products.id_product')
    console.log(results)
    console.log('BDD Conectada')
})
.catch()

app.engine('handlebars',handlebars.engine())
app.set('views',__dirname + '/views')
app.set('view engine','handlebars')

app.use(express.static(__dirname + '/public'))
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use('/',viewsRouter)
app.use('/api/products',prodsRouter)
app.use('/api/carts',cartsRouter)
app.use('/api/messages',messageRouter)
app.use('/api/users', usersRouter)

const io = new Server(httpS)

/*io.on('connection',(socket) => { 
    socket.on('delete', async (msg) => {
        const pid = msg
        const currList = await manager.deleteProduct(pid)
        io.emit('delete',currList)
    })
    socket.on('update',async (msg) => {
        if (msg) {
            const product = msg
            manager.addProduct(product)
            const currList = await manager.getProducts()
            io.emit('update', currList)
        } 
        else {
            console.log('error en el producto')
        }
    }) 
})*/


    