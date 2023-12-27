import { Router } from 'express'
import { authorize } from '../utils/msgsErrors.js'
import { getRoot, getHome, getLogin, getSign, getProducts, deleteProductView, getDetails, getCart, getRtp, postRtp, delRtp } from '../controllers/views.controller.js'
import { authToken } from '../utils/jwt.js'

const viewsRouter = Router()

viewsRouter.get('/', getRoot)
viewsRouter.get('/home',authToken, getHome)
viewsRouter.get('/login', getLogin)
viewsRouter.get('/sign', getSign)
viewsRouter.get('/products', getProducts)
viewsRouter.get('/cart', getCart)
viewsRouter.get('/cart/:pid', deleteProductView)
viewsRouter.get('/details/:pid', getDetails)
viewsRouter.get('/realtimeproducts', getRtp)
viewsRouter.post('/realtimeproducts', authorize('admin'), postRtp)
viewsRouter.post('/realtimeproducts/:pid', authorize('admin'), delRtp)

export default viewsRouter