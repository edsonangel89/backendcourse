import { Router } from "express"
import { generateProducts } from "../utils/mocking.js"

const mockRouter = Router()

mockRouter.get('/', generateProducts)

export default mockRouter