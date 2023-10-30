import { messageModel } from "../models/messages.models.js"

export const getMessages = async () => {
    const { limit } = req.query
    try {
        if (limit) {
            const messages = await messageModel.find().limit(limit)
            return res.status(200).send(messages)
        }
        else {
            const messages = await messageModel.find()
            return res.status(200).send(messages)
        }
    }
    catch (error) {
        return res.status(400).send('Error al consultar mensages\n' + error)
    }
}

export const getMessageById = async () => {
    const { mid } = req.params
    try {
        const message = await messageModel.findById(mid)
        if (message) {
            return res.status(200).send(message)
        }
        else {
            return res.status(404).send('Mensaje no encontrado')
        }
    }
    catch (error) {
        return res.status(400).send('Error al consultar el mensage\n' + error)
    }
}

export const postMessage = async () => {
    const { usremail, body } = req.body
    try {
        const postedMessage = await messageModel.create({
            message: [
                {
                    usremail,
                    body
                }
            ]
        })
        return res.status(200).send('Mensaje publicado')
    }
    catch (error) {
        return res.status(400).send('Error al publicar mensaje\n' + error)
    }
}

export const updateMessage = async () => {
    const { mid } = req.params
    const { usremail, body } = req.body
    try {
        const messageObj = await messageModel.findByIdAndUpdate(mid, {
            message: [
                {
                    usremail,
                    body
                }
            ]
        })
        return res.status(200).send(messageObj) 
    }
    catch (error) {
        return res.status(400).send('Error en la actualizacion de mensaje\n' + error)
    }
}

export const deleteMessage = async () => {
    const { mid } = req.params
    try {
        await messageModel.findByIdAndDelete(mid)
        return res.status(200).send('Mensaje borrado')
    }
    catch (error) {
        return res.status(400).send('Error al borrar mensaje\n' + error)
    }
}