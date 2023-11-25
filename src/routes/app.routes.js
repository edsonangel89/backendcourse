import { Router } from "express"
import productsRouter from "./products.routes.js"
import cartsRouter from "./carts.routes.js"
import usersRouter from "./users.routes.js"
import sessionRouter from "./sessions.routes.js"
import viewsRouter from "./views.routes.js"
import messageRouter from "./messages.routes.js"
import mockRouter from "./mocks.routes.js"

const router = Router()

router.use('/', viewsRouter)
router.use('/api/products', productsRouter)
router.use('/api/carts', cartsRouter)
router.use('/api/users', usersRouter)
router.use('/api/sessions', sessionRouter)
router.use('/api/messages', messageRouter)
router.use('/mockingproducts', mockRouter)

export default router