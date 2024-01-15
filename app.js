import 'dotenv/config'
import express from 'express'
import router from './src/routes/app.routes.js'
import __dirname from './src/path.js'
import handlebars from 'express-handlebars'
import mongoose from 'mongoose'
import session from 'express-session'
import cookieParser from 'cookie-parser'
import MongoStore from 'connect-mongo'
import initialize from './src/config/passport.js'
import passport from 'passport'
import errorHandler from './src/middleware/errors/index.js'
import { addInfoLogger } from "./src/config/logger.js"
import swaggerJsdoc from 'swagger-jsdoc'
import swaggerUiExpress from 'swagger-ui-express'

const app = express()
const httpS = app.listen(process.env.PORT,() => console.log("Server on port 8080"))

/*const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: 'puntoaquaoficial@gmail.com',
        pass: process.env.MAIL_PASSWORD,
        authMethod: 'LOGIN'
    }
})*/


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