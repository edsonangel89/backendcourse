import express from 'express'
import fs from 'fs'
import {ProductManager} from './ProductManager.js'

const app = express()


app.get('/products',(req, res) => { 
    const manager = new ProductManager()
    res.send(manager.getProducts())
})

app.get('/products/:pid',(req, res) => {

})

app.listen(8080,() => console.log("Server on port 8080"))

