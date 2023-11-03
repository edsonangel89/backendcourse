import { Router } from "express"
import { authorize } from "../utils/msgsErrors.js" 
import { getUsers, getUserById, updateUser, deleteUser } from "../controllers/users.controller.js"

const usersRouter = Router()

usersRouter.get('/', getUsers)
usersRouter.get('/:uid', getUserById)
usersRouter.put('/:uid', authorize('admin'), updateUser)
usersRouter.delete('/:uid', authorize('admin'), deleteUser)

export default usersRouter