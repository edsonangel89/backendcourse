import { productModel } from "../models/products.models.js"
import CustomError from "../services/errors/customError.js"
import EErrors from "../services/errors/enumErrors.js"
import { generateUserErrorInfo } from "../services/errors/info.js"

export const getProducts = async (req, res) => {
    const { limit, page, sort, category } = req.query
    try {
        const lim = limit ? limit : 10
        const pag = page ? page : 1
        const sor = sort ? sort : 'asc'
        if (category) {
            const products = await productModel.paginate({category: category},{limit: lim, page: pag, sort:{price: sor}})
            if (req.user) {
                if (req.user.role == 'userPremium') {
                    products.docs.forEach(element => {
                        element.price = element.price - (element.price * 0.1)
                    })
                }
                return res.status(200).send(products)
            }
            else {
                return res.status(200).send(products)
            }
        } 
        else {
            const products = await productModel.paginate({},{limit: lim, page: pag, sort:{price: sor}})
            if (req.user) {
                if (req.user.role == 'userPremium') {
                    products.docs.forEach(element => {
                        element.price = element.price - (element.price * 0.1)
                    })
                }
                return res.status(200).send(products)
            }
            else {
                return res.status(200).send(products)
            }
        }
    }
    catch(error) {
        return res.status(400).send('Error en la consulta de los productos\n' + error)
    }
}

export const getProductId = async (req, res) => {
    const { pid } = req.params
    try {
        const product = await productModel.paginate({_id: pid})
        if (product) {
            if (req.user) {
                if (req.user.role == 'userPremium') {
                    product.docs.forEach(element => {
                        element.price = element.price - (element.price * 0.1)
                    })
                }
                return res.status(200).send(product)
            }
            else {
                return res.status(200).send(product)
            }
        }
        else {
            return res.status(404).send('Producto no encontrado')
        }
    }
    catch (error) {
        return res.status(400).send('Error al consultar el producto\n' + error)       
    }
}

export const addProduct = async (req, res) => {
    const { title, description, code, price, stock, category, thumbnail } = req.body

    if ( !title || !code || !price || !stock ) {
        CustomError.createError({
            name: 'Add product error',
            cause: generateUserErrorInfo({title, description, code, price, stock, category, thumbnail}),
            message: 'Error trying to add a new product',
            code: EErrors.INVALID_TYPES_ERROR
        })
    }

    try {
        const pricePrecision = float(price).toPrecision(3)
        const addedProduct = await productModel.create({ title, description, code, pricePrecision, stock, category, thumbnail})
        //console.log('Product added:')
        req.logger.info('Product added: ')
        console.log(addedProduct)
        req.logger.info(addedProduct)
        return res.status(201).send('Producto agregado')       
    }
    catch (error) {
        req.logger.fatal('Error al agregar producto')
        return res.status(400).send('Error en el registro de producto\n' + error)
    }
}

export const updateProduct = async (req, res) => {
    const { pid } = req.params
    const { title, description, code, price, stock, category, thumbnail } = req.body
    try {
        const updatedProduct = await productModel.findByIdAndUpdate( pid, { title, description, code, price, stock, category, thumbnail })
        console.log('Product updated:')
        console.log(updatedProduct)
        return res.status(200).send(updatedProduct)
    }
    catch (error) {
        return res.status(400).send('Error en la actualizacion de producto\n' + error)
    }
}

export const deleteProduct = async (req, res) => {
    const { pid } = req.params
    try {
        const deletedProduct = await productModel.findByIdAndDelete(pid)
        console.log('Producto borrado')
        return res.status(200).send('Producto borrado')
    }
    catch (error) {
        return res.status(400).send('Error al borrar el producto\n' + error)
    }
}