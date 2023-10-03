import 'dotenv/config'
import express from 'express'
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
import session from 'express-session'
import cookieParser from 'cookie-parser'
import MongoStore from 'connect-mongo'
import sessionRouter from './routes/sessions.routes.js'
import initialize from './config/passport.js'
import passport from 'passport'

const app = express()
const httpS = app.listen(8080,() => console.log("Server on port 8080"))

mongoose.connect(process.env.MONGO_URL)
.then(async () => {console.log('BDD Conectada')})
.catch()

app.engine('handlebars',handlebars.engine())
app.set('views',__dirname + '/views')
app.set('view engine','handlebars')

app.use(express.static(__dirname + '/public'))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser(process.env.SIGNED_COOKIE))
app.use(session({
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_URL,
        mongoOptions: {
            useNewUrlParser: true,
            useUnifiedTopology: true
        },
        ttl: 6000000
    }),
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true
}))
initialize()
app.use(passport.initialize())
app.use(passport.session())

app.use('/',viewsRouter)
app.use('/api/products',prodsRouter)
app.use('/api/carts',cartsRouter)
app.use('/api/messages',messageRouter)
app.use('/api/users', usersRouter)
app.use('/api/sessions', sessionRouter)

/*const io = new Server(httpS)

io.on('connection',(socket) => { 
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


    