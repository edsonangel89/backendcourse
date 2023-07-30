//Define ProductManger class

class ProductManager {
    
    constructor() {

        this.products = []

    }

    addProduct(product) {
        
        const item = this.products.find(item => item.code === product.code)

        if (item) {
            console.log("Ya existe el producto")
        } else {
            this.products.push(product)
        }

    }

    getProducts() {

        console.log(this.products)

    }

    getProductById(id) {
        const item = this.products.find(item => item.id === id)

        if (item) {
            console.log(item)
        } else {
            console.log("Producto no encontrado")
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
const Product2 = new Product("Nombre","Caracteristicas",50,[],"AAEECA", 5)

//Call addProduct method

Manager.addProduct(Product1)
Manager.addProduct(Product2)

//Call getProducts method

Manager.getProducts()

//Call getProductById method

Manager.getProductById(2)
