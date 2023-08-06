import { promises as fs} from 'fs'

//Define ProductManger class

class ProductManager {
    
    constructor() {

        this.path = "./products.json"

    }    

    async addProduct(product) {

        const prods = JSON.parse(await fs.readFile(this.path, 'utf-8'))
        const producto = prods.find(prod => prod.id === product.id)

        if (producto) {
            console.log("Ya agregaste este producto")
        } else {
            prods.push(product)
            await fs.writeFile(this.path,JSON.stringify(prods))
        }
        
    }

    async getProducts() {

        const prods = JSON.parse(await fs.readFile(this.path, 'utf-8'))
        console.log(prods)
        return prods
    }

    async getProductById(id) {

        const prods = JSON.parse(await fs.readFile(this.path, 'utf-8'))
        const producto = prods.find(prod => prod.id === id)

        if (producto) {
            console.log(producto)
            return producto
        } else {
            console.log("Producto no encontrado")
        }

    }

    async updateProduct(id,title,description,price,thumbnail,code,stock) {

        const prods = JSON.parse(await fs.readFile(this.path, 'utf-8'))
        const producto = prods.find(prod => prod.id === id)

        if (producto) {
            producto.title = title
            producto.description = description
            producto.price = price
            producto.thumbnail = thumbnail
            producto.code = code
            producto.stock = stock
            await fs.writeFile(this.path,JSON.stringify(prods))
        } else {
            console.log("Producto no existe")
        }

    }

    async deleteProduct(id) {

        const prods = JSON.parse(await fs.readFile(this.path, 'utf-8'))
        const delObj = prods.find(prod => prod.id === id)

        if (delObj) {
            delete prods.indexOf(delObj)
            await fs.writeFile(this.path,JSON.stringify(prods))
        } else {
            console.log("Producto no existe")
        }

    }
}

//Define Product class

class Product {
    
    constructor(title, description, price, thumbnail, code, stock) {
        
        this.title = title
        this.description = description
        this.price = price
        this.thumbnail = thumbnail
        this.code = code
        this.stock = stock
        this.id = Product.changeId()

    }  

    static changeId() {

        if (this.increaseId) {
            this.increaseId++
        } else {
            this.increaseId = 1
        }
        return this.increaseId
    }
}


//ProductManager instance

const Manager = new ProductManager()

//Product instance(s)

const Product1 = new Product("Nombre","Caracteristicas",50,[],"AAEECC", 5)
const Product2 = new Product("Nombre","Caracteristicas",50,[],"AAEECB", 5)

//Call addProduct method

Manager.addProduct(Product1)
Manager.addProduct(Product2)

//Call getProductById method

//Manager.getProductById(3)

//Call deleteProduct method

//Manager.deleteProduct(2)

//Call getProducts method

Manager.getProducts()

//Call updateProduct method

Manager.updateProduct(1,'Hey','Yeah',3,{},'EEEEE',1)