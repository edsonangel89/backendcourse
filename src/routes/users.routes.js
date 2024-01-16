import { Router } from "express"
import { authorize } from "../utils/msgsErrors.js" 
import { getUsers, getUserById, updateUser, deleteUser, verifyUser, updatePassword } from "../controllers/users.controller.js"

const usersRouter = Router()

usersRouter.get('/', getUsers)
usersRouter.get('/:uid', getUserById)
usersRouter.put('/:uid', )
usersRouter.put('/:uid', authorize('admin'), updateUser)
usersRouter.delete('/:uid', authorize('admin'), deleteUser)
usersRouter.post('/restorePassword', verifyUser)
usersRouter.get('/newPasswords/:email', updatePassword)

export default usersRouter