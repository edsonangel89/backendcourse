import { Router } from "express"
import { getMessages, getMessageById, postMessage, updateMessage, deleteMessage } from "../controllers/messages.controller.js"

const messageRouter = Router()

messageRouter.get('/', getMessages)
messageRouter.get('/:mid', getMessageById)
messageRouter.post('/', postMessage)
messageRouter.put('/:mid', updateMessage)
messageRouter.delete('/:mid', deleteMessage)

export default messageRouter