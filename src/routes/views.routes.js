import { Router } from 'express'
import { authorize } from '../utils/msgsErrors.js'
import { getRoot, getHome, getLogin, getSign, getProds, deleteProductView, getDetails, getCart, getRtp, postRtp, delRtp, getNewPassword, setNewPassword } from '../controllers/views.controller.js'
import { authToken } from '../utils/jwt.js'
import { send } from '../utils/mailer.js'

const viewsRouter = Router()

viewsRouter.get('/', getRoot)
viewsRouter.get('/home', getHome)
viewsRouter.get('/login', getLogin)
viewsRouter.get('/sign', getSign)
viewsRouter.get('/products', getProds)
viewsRouter.get('/cart', getCart)
viewsRouter.get('/cart/:pid', deleteProductView)
viewsRouter.get('/details/:pid', getDetails)
viewsRouter.get('/realtimeproducts', getRtp)
viewsRouter.post('/realtimeproducts', authorize('admin'), postRtp)
viewsRouter.post('/realtimeproducts/:pid', authorize('admin'), delRtp)
viewsRouter.get('/updatePassword/:token', setNewPassword)
viewsRouter.get('/reset', getNewPassword)

export default viewsRouter