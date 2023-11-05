import { userModel } from "../models/users.models.js"

export const getUsers = async (req, res) => {
    const { limit } = req.query
    try {
        if (limit) {
            const users = await userModel.find().limit(limit)
            return res.status(200).send(users)
        }
        else {
            const users = await userModel.find()
            return res.status(200).send(users)
        }
    }
    catch (error) {
        return res.status(400).send('Error al consultar usuarios\n' + error)
    }
}

export const getUserById = async (req, res) => {
    const { uid } = req.params
    try {
        const user = await userModel.findById(uid)
        if (user) {
            return res.status(200).send(user)
        }   
        else {
            return res.status(404).send('Usuario no encontrado en la base de datos')
        }     
    }
    catch (error) {
        return res.status(400).send('Error al consultar usuario por ID\n' + error)
    }
}

export const updateUser = async (req, res) => {
    const { uid } = req.params
    const { fname, lname, age, email, password } = req.body
    try {
        const updatedUser = await userModel.findByIdAndUpdate(uid, { fname, lname, age, email, password })
        return res.status(200).send(updatedUser)
    }
    catch (error) {
        return res.status(400).send('Error en la actualizacion de usuario\n' + error)
    }
}

export const deleteUser = async (req, res) => {
    const { uid } = req.params 
    try {
        const user = await userModel.findByIdAndDelete(uid)
        console.log('Usuario borrado')
        return res.status(200).send('Usuario borrado')
    }
    catch (error) {
        return res.status(400).send('Error al eliminar usuario\n' + error)
    }
}