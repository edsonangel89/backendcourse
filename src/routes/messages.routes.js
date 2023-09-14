import { Router } from "express"
import { messageModel } from "../models/messages.models.js"

const messageRouter = Router()

messageRouter.get('/', async (req, res) => {
    const { limit } = req.query
    try {
        if (limit) {
            const messages = await messageModel.find().limit(limit)
            res.status(200).send(messages)
        }
        else {
            const messages = await messageModel.find()
            res.status(200).send(messages)
        }
    }
    catch (error) {
        res.status(400).send('Error al consultar mensajes\n' + error)
    }
})

messageRouter.get('/:mid', async (req, res) => {
    const { mid } = res.params
    try {
        const message = await messageModel.findById(mid)
        res.status(200).send(message)
    }
    catch (error) {
        res.status(400).send('Error al consultar mensaje\n' + error)
    }
})

messageRouter.post('/', async (req, res) => {
    const { usremail, body } = req.body
    try {
        const postMessage = await messageModel.create({
            message: [ {
                    usremail,
                    body
                    }
                ]
        })
        res.status(200).send('Mensaje publicado')
    }
    catch (error) {
        res.status(400).send('Error al publicar mensaje\n' + error)
    }
})

messageRouter.put('/:mid', async (req, res) => {
    const { mid } = req.params
    const { usremail, body } = req.body
    try {
        const updateMessage = await messageModel.findByIdAndUpdate(mid, {
            message: [
                    {
                        usremail,
                        body
                    }
                ]
        })
        res.status(200).send('Mensaje modificado')
    }
    catch(error) {
        res.status(400).send('Error al modificar el mensaje\n' + error)
    }
})

messageRouter.delete('/:mid', async (req, res) => {
    const { mid } = req.params
    try {
        const deleteMessage = await messageModel.findByIdAndDelete(mid)
        res.status(200).send('Mensaje eliminado')
    }
    catch(error) {
        res.status(400).send('Error al eliminar mensaje\n' + error)
    }
})

export default messageRouter