import { Router } from 'express'
import { getProducts, getProductId, addProduct, updateProduct, deleteProduct } from '../controllers/products.controller.js'
import { authorize } from '../utils/msgsErrors.js'

const productsRouter = Router()

productsRouter.get('/', getProducts)
productsRouter.get('/:pid', getProductId)
productsRouter.post('/', addProduct)
productsRouter.put('/:pid', authorize('admin'), updateProduct)
productsRouter.delete('/:pid', authorize('admin'), deleteProduct)

export default productsRouter