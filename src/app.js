import 'dotenv/config'
import express from 'express'
import router from './routes/app.routes.js'
import prodsRouter from './routes/products.routes.js'
import cartsRouter from './routes/carts.routes.js'
import __dirname from './path.js'
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
import errorHandler from './middleware/errors/index.js'
import { addInfoLogger } from "./config/logger.js"
import swaggerJsdoc from 'swagger-jsdoc'
import swaggerUiExpress from 'swagger-ui-express'

const app = express()
const httpS = app.listen(8080,() => console.log("Server on port 8080"))

mongoose.connect(process.env.MONGO_URL)
.then(async () => {console.log('BDD Conectada')})
.catch()

const swaggerOptions = {
    definition: {
        openapi: '3.0.1',
        info: {
            title: 'Documentacion ecommerce',
            description: 'Documentacion para tienda en linea'
        }
    },
    apis: [`${__dirname}/docs/**/*.yaml`]
}

const specs = swaggerJsdoc(swaggerOptions)
app.use('/apidocs',swaggerUiExpress.serve,swaggerUiExpress.setup(specs))

app.engine('handlebars',handlebars.engine())
app.set('views',__dirname + '/views')
app.set('view engine','handlebars')

app.use(addInfoLogger)
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

app.use('/', router)
app.use(errorHandler)    