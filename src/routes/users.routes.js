import { Router } from "express"
import { getUsers, getUserById, updateUser, deleteUser } from "../controllers/users.controller.js"

const usersRouter = Router()

usersRouter('/', getUsers)
usersRouter('/:uid', getUserById)
usersRouter('/:uid', updateUser)
usersRouter('/:uid', deleteUser)

export default usersRouter