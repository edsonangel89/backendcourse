import express from 'express'
import prodsR from './routes/products.routes.js'
import cartsR from './routes/carts.routes.js'
import __dirname from './utils.js'
import handlebars from 'express-handlebars'
import viewsRouter from './routes/views.router.js'
import {Server} from 'socket.io'

const app = express()
const httpS = app.listen(8080,() => console.log("Server on port 8080"))


app.engine('handlebars',handlebars.engine())
app.set('views',__dirname + '/views')
app.set('view engine','handlebars')

app.use(express.static(__dirname + '/public'))
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use('/',viewsRouter)
app.use('/api/products',prodsR)
app.use('/api/carts',cartsR)

const socketS = new Server(httpS)

socketS.on('connection', (socket) => {
        console.log('Hello Im a socket')
    }
)


