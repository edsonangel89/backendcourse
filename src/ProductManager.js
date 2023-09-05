import fs from 'fs'

//Define ProductManger class

export class ProductManager {
    constructor() {
        this.path = "./products.json"
    }    
    addProduct(product) {
        const prods = JSON.parse(fs.readFileSync(this.path, 'utf-8'))
        const producto = prods.find(prod => prod.code === product.code)

        if (prods.length == 0) {
            const currId = 0
            const {title,description,code,price,stock,category,thumbnail} = product
            const newProduct = new Product(currId,title,description,code,price,stock,category,thumbnail)
            if (producto) {
                return 'ERROR'
            } 
            else {
                prods.push(newProduct)
                fs.writeFileSync(this.path,JSON.stringify(prods))
                return newProduct
            }
        } 
        else {
            const currId = prods[prods.length - 1].id
            const {title,description,code,price,stock,category,thumbnail} = product
            const newProduct = new Product(currId,title,description,code,price,stock,category,thumbnail)
            if (producto) {
                return 'ERROR'
            } 
            else {
                prods.push(newProduct)
                fs.writeFileSync(this.path,JSON.stringify(prods))
                return newProduct
            }
        }
    }
    async getProducts() {
        const prods = JSON.parse(await fs.promises.readFile(this.path, 'utf-8'))
        return prods
    }
    async getProductById(id) {
        const prods = JSON.parse(await fs.promises.readFile(this.path, 'utf-8'))
        const producto = prods.find(prod => prod.id === id)
        if (producto) {
            return producto
        } 
        else {
            return 'Producto no encontrado'
        }
    }
    async updateProduct(id,title,description,price,thumbnail,code,stock) {
        const prods = JSON.parse(await fs.promises.readFile(this.path, 'utf-8'))
        const producto = prods.find(prod => prod.id === id)
        if (producto) {
            producto.title = title
            producto.description = description
            producto.price = price
            producto.thumbnail = thumbnail
            producto.code = code
            producto.stock = stock
            await fs.promises.writeFile(this.path,JSON.stringify(prods))
        } 
        else {
            console.log("Producto no existe")
        }
    }
    async deleteProduct(id) {
        const prods = JSON.parse(await fs.promises.readFile(this.path, 'utf-8'))
        const producto = prods.filter(prod => prod.id != id)
        if (producto) {
            await fs.promises.writeFile(this.path,JSON.stringify(producto))
        } 
        else {
            console.log("Producto no existe")
        }
    }
}

export class Product {
    constructor(id,title,description,code,price,stock,category,thumbnail) {
        this.id = id + 1
        this.title = title
        this.description = description
        this.code = code
        this.price = price
        this.status = true
        this.stock = stock
        this.category = category
        this.thumbnail = thumbnail
    }  
}

