import { Router } from 'express'
import { authorize } from '../utils/msgsErrors.js'
import { getRoot, getHome, getRtp, postRtp, delRtp } from '../controllers/views.controller.js'

const viewsRouter = Router()

viewsRouter.get('/', getRoot)
viewsRouter.get('/home', getHome)
viewsRouter.get('/realtimeproducts', getRtp)
viewsRouter.post('/realtimeproducts', authorize('admin'), postRtp)
viewsRouter.post('/realtimeproducts/:pid', authorize('admin'), delRtp)

export default viewsRouter