import { Router } from "express"
import { getUsers, getUserById, updateUser, deleteUser } from "../controllers/users.controller.js"

const usersRouter = Router()

usersRouter.get('/', getUsers)
usersRouter.get('/:uid', getUserById)
usersRouter.put('/:uid', updateUser)
usersRouter.delete('/:uid', deleteUser)

export default usersRouter