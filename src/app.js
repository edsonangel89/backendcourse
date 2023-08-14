import express from 'express'
import productManager from './ProductManager.js'

const app = express()

app.get('/',(req, res) => {
    const products = new productManager()
    
    res.send(products.getProducts())
})

app.get('/products/:pid',(req, res) => {

})

app.listen(8080,() => console.log("Server on port 8080"))