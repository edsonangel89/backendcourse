import express from 'express'
import prodsR from './routes/products.routes.js'
import cartsR from './routes/carts.routes.js'
import __dirname from './utils.js'
import handlebars from 'express-handlebars'
import viewsRouter from './routes/views.router.js'
import {Server} from 'socket.io'
import { ProductManager,Product } from './ProductManager.js'

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
app.use('/api/products',prodsR)
app.use('/api/carts',cartsR)



app.get('/api/products', (req, res) => {
        res.status(200).send()
    }
)

const io = new Server(httpS)

io.on('connection',(socket) => { 
    //console.log('socket connected')
    socket.on('product', (prod) => {
        const {title,description,code,price,stock,category,thumbnail} = prod
        const product = new Product(title,description,code,price,stock,category,thumbnail)
        //const {title,description,code,price,stock,category,thumbnail} = prod
        manager.addProduct(product)
        //console.log(description)
        io.emit('products', "ok")
    } )
    }
)

app.post('/', (req, res) => {

    io.emit('test',"emit from post")
    console.log('post sended')
    res.status(200)
    res.render()

    }
)



    