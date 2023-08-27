import fs from 'fs'

export class CartManager {

    constructor () {

        this.path = "./carts.json"

    }

    addCart(cart) {

        const cars = JSON.parse(fs.readFileSync(this.path, 'utf-8'))
        const car = cars.find(carr => carr.id === cart.id)

        if (car) {
            console.log("Ya agregaste este carrito con ID: " + cart.id)
        } else {
            cars.push(cart)
            fs.writeFileSync(this.path,JSON.stringify(cars))
        }
        
    }

    async getCartById(id) {

        const cars = JSON.parse(await fs.promises.readFile(this.path, 'utf-8'))
        const cid = cars.find(car => car.id === id)

        if (cid) {
            return cid.products
        } else {
            return "No existe este carrito"
        }

    }

    async addProductById(cid,pid) {

        const cars = JSON.parse(await fs.promises.readFile(this.path, 'utf-8'))
        const cartId = cars.find(car => car.id === cid)

        if (cartId) {
            
            const id = cartId.products.find(prod => prod.id === pid)

            if (id) {
                
                id.quantity++

            } else {
                
                const prod = {
                    "id": pid,
                    "quantity": 1
                }
                
                cartId.products.push(prod)

            }

        } else {
            
            return "No existe el carrito"

        }

        await fs.promises.writeFile(this.path,JSON.stringify(cars))
    
    }

}

export class Cart {

    constructor() {

        this.id = Cart.changeId()
        this.products = []

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