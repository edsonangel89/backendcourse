import { cartModel } from "../models/carts.models.js"
import { productModel } from "../models/products.models.js"

export const createCart = async (req, res) => {
    try {
        const createdCart = await cartModel.create({})
        console.log('Cart created')
        return res.status(201).send(createdCart)
    }
    catch (error) {
        return res.status(400).send('Error al crear un nuevo carrito\n' + error)
    }
}

export const getCartById = async (req, res) => {
    const { cid } = req.params
    try {
        const cart = await cartModel.findById(cid)
        return res.status(200).send(cart)
    }
    catch (error) {
        return res.status(400).send('Error al consultar\n' + error)
    }
}

export const addProduct = async (req, res) => {
    const { cid, pid } = req.params
    const { quantity } = req.body
    try {
        const cart = await cartModel.findById(cid)
        if (cart) {
            const product = await productModel.findById(pid)
            if (product) {
                const prod = cart.products.find(p => p.id_product == pid)
                if (prod) {
                    cart.products.quantity = quantity
                    await cartModel.findByIdAndUpdate(cid, cart)
                    return res.redirect('/',200,{})
                } 
                else {
                    cart.products.push({id_product: pid, quantity: quantity})
                    await cartModel.findByIdAndUpdate(cid, cart)
                    return res.redirect('/',200,{})
                }
            }
            else {  
                return res.status(404).send('Producto no encontrado en la base de datos')
            }
        }
        else {
            return res.status(404).send('Carrito no encontrado en la base de datos')
        }
        return res.status(200).send(cart)
    }
    catch (error) {
        return res.status(400).send('Error al agregar producto al carrito\n' + error)
    }
}

export const deleteProduct = async (req, res) => {
    const { cid, pid } = req.params
    try {
        const cart = await cartModel.findById(cid)
        if (cart) {
            const products = cart.products
            const product = await productModel.findById(pid)
            if (product) {
                const productInCart = products.find(p => p.id_product == pid) 
                if (productInCart) {
                    const newProducts = products.filter(p => p.id_product != pid)
                    await cartModel.findByIdAndUpdate(cid, {products: newProducts})
                    return res.status(200).send(newProducts)
                }
                else {
                    return res.status(404).send('Producto no existe en el carrito')
                }
            }
            else {
                return res.status(404).send('Producto no encontrado en la base de datos')
            }
        }
        else {
            return res.status(404).send('Carrito no encontrado en la base de datos')
        }
    }
    catch (error) {
        return res.status(400).send('Error al borrar producto del carrito\n' + error)
    }
}

export const deleteCart = async (req, res) => {
    const { cid } = req.params
    try {
        const cart = await cartModel.findById(cid)
        if (cart) {
            await cartModel.findByIdAndDelete(cid)
            console.log('Carrito borrado')
            return res.status(200).send('Carrito borrado')
        }
        else {
            return res.status(404).send('Carrito no encontrado')
        }
    }
    catch (error) {
        return res.status(400).send('Error al borrar carrito\n' + error)
    }
}

export const updateProductInCart = async (req, res) => {
    const { cid, pid } = req.params
    const { quantity } = req.body
    try {
        const cart = await cartModel.findById(cid)
        if (cart) {
            const products = cart.products
            const product = await cartModel.findById(pid)
            if (product) {
                const productInCart = products.find(p => p.id_product == pid)
                if (productInCart) {
                    products.quantity = quantity
                    await cartModel.findByIdAndUpdate(cid, cart)
                    console.log('Producto actualizado')
                    return res.status(200).send('Producto actualizado')
                }
                else {
                    console.log('El producto no existe en el carrito')
                    return res.status(404).send('El producto no existe en el carrito')
                }
            }
            else {
                console.log('Producto no encontrado')
                return res.status(404).send('Producto no encontrado')
            }
        }
        else {
            return res.status(404).send('Carrito no encontrado')
        }
    }
    catch (error) {
        return res.status(400).send('Error al actualizar el carrito\n' + error)
    }
}

export const updateCart = async (req, res) => {
    const { cid } = req.params
    const productsArray = req.body
    try {
        const cart = await cartModel.findById(cid)
        if (cart) {
            productsArray.forEach(element => {
                const addedProduct = cart.products.find(prod => prod.id_product._id == element.id_product) 
                if (addedProduct) {
                    addedProduct.quantity = element.quantity
                }
                else {
                    cart.products.push(element)
                }
            })
            await cartModel.findByIdAndUpdate(cid, cart)
            return res.status(200).send(cart)
        }
        else {
            return res.status(404).send('Carrito no encontrado')
        }
    }
    catch(error) {
        return res.status(400).send('Error de actualizacion de carrito\n' + error)
    }
}