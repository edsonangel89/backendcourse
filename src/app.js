import express from 'express'
import fs from 'fs'
import {ProductManager} from './ProductManager.js'

const app = express()
const manager = new ProductManager()

app.use(express.urlencoded({extended:true}))

app.get('/products',(req, res) => { 
    const lim = req.query
    let {limit} = req.query

    if (lim) {
        
    }
})

app.get('/products/:pid',(req, res) => {
    const productId = req.params.pid

})

app.listen(8080,() => console.log("Server on port 8080"))

