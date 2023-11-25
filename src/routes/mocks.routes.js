import { Router } from "express"
import { generateUsers } from "../utils/mocking.js"

const mockRouter = Router()

mockRouter.get('/', generateUsers)

export default mockRouter