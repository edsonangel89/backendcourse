import fs from 'fs'

//Define ProductManger class

export class ProductManager {
    
    constructor() {

        this.path = "./products.json"

    }    

    addProduct(product) {

        const prods = JSON.parse(fs.readFileSync(this.path, 'utf-8'))
        const producto = prods.find(prod => prod.id === product.id)

        if (producto) {
            console.log("Ya agregaste este producto con ID: " + product.id)
        } else {
            prods.push(product)
            fs.writeFileSync(this.path,JSON.stringify(prods))
        }
        
    }

    async getProducts() {

        const prods = JSON.parse(await fs.promises.readFile(this.path, 'utf-8'))
        //const newprods = prods.slice(0,qty)
        //console.log(prods)
        return prods

    }

    async getProductById(id) {

        const prods = JSON.parse(await fs.promises.readFile(this.path, 'utf-8'))
        const producto = prods.find(prod => prod.id === id)

        if (producto) {
            return producto
        } else {
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
        } else {
            console.log("Producto no existe")
        }

    }

    async deleteProduct(id) {

        const prods = JSON.parse(await fs.promises.readFile(this.path, 'utf-8'))
        const producto = prods.filter(prod => prod.id != id)

        if (producto) {
            await fs.promises.writeFile(this.path,JSON.stringify(producto))
        } else {
            console.log("Producto no existe")
        }

    }
}

//Define Product class

export class Product {
    
    constructor(title,description,code,price,stock,category,thumbnail) {
        
        this.id = Product.changeId()
        this.title = title
        this.description = description
        this.code = code
        this.price = price
        this.status = true
        this.stock = stock
        this.category = category
        this.thumbnail = thumbnail

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

//const Manager = new ProductManager()

//Product instance(s)

//const Product1 = new Product("Garrafon 20","Contenedor de 20 litros",15,[],"GAF20", 89)
//const Product2 = new Product("Garrafon 19","Contenedor de 19 litros",13,[],"AAEECB", 52)
//const Product3 = new Product("Botella 1 lt","Contenedor de 1 litro",7,[],"AAEECC", 146)
//const Product4 = new Product("Botella 1/2 lt","Contenedor de 1/2 litro",5,[],"AAEECD", 96)

////////////////////////////////////////Call addProduct method

//Manager.addProduct(Product1)
//Manager.addProduct(Product2)
//Manager.addProduct(Product3)
//Manager.addProduct(Product4)

////////////////////////////////////////Call getProductById method

//Manager.getProductById(1)

////////////////////////////////////////Call deleteProduct method

//Manager.deleteProduct(1)
//Manager.deleteProduct(2)
//Manager.deleteProduct(3)
//Manager.deleteProduct(4)

////////////////////////////////////////Call getProducts method

//Manager.getProducts()

////////////////////////////////////////Call updateProduct method

//Manager.updateProduct(2,'Botella 1','Contenedor de 1 litro',7,{},'BOT1',146)

