//Define ProductManger class

class ProductManager {
    
    constructor() {

        this.products = []

    }

    addProduct(product) {
        
        this.products.push(product)

    }

    getProducts() {

        console.log(this.products)

    }

    getProductById() {

    }

}

//Define Product class

class Product {
    
    constructor(title, description, price, thumbnail, code, stock) {
        
        this.title = title
        this.description = description
        this.price = price
        this.thumbnail = thumbnail
        this.stock = stock

    }  
}


//ProductManager instance

const Manager = new ProductManager()

//Product instance

const Product1 = new Product("Nombre",)

//Call addProduct method

Manager.addProduct(Product1)

//Call getProducts method

Manager.getProducts()
