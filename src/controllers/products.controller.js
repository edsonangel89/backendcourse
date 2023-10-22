import { productModel } from "../models/products.models.js"

export const getProducts = async (req, res) => {
    const { limit, page, sort, category } = req.query
    try {
        const lim = limit ? limit : 10
        const pag = page ? page : 1
        const sor = sort ? sort : 'asc'
        if (category) {
            const products = await productModel.paginate({category: category},{limit: lim, page: pag, sort:{price: sor}})
            return res.status(200).send(products)
        } 
        else {
            const products = await productModel.paginate({},{limit: lim, page: pag, sort:{price: sor}})
            return res.status(200).send(products)
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
            return res.status(200).send(product)
        }
        else {
            return res.status(404).send('Producto no encontrado')
        }
    }
    catch (error) {
        return res.status(400).send('Error al consultar el producto\n' + error)       
    }
}