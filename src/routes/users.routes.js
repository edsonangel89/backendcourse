import { Router } from "express";
import { userModel } from "../models/users.models.js";

const usersRouter = Router()

const auth = (req, res, next) => {
    if (req.session.role == 'admin') {
        next()
    }
    else {
        console.log(req.session.role)
        res.status(403).send('No tienes acceso a este recurso')
    }
}

usersRouter.get('/', auth, async (req, res) => {
    const { limit } = req.query
    try {
        if (limit) {
            const users = await userModel.find().limit(limit)
            res.status(200).send(users)
        }
        else {
            const users = await userModel.find()
            res.status(200).send(users)
        }
    }
    catch(error) {
        res.status(400).send('Error al consultar usuarios\n' + error)
    }
})

usersRouter.get('/:uid', auth, async (req, res) => {
    const { uid } = req.params
    try {
        const user = await userModel.findById(uid)
        if (user) {
            res.status(200).send(user)
        }
        else {
            res.status(404).send('Usuario no encontrado')
        }
    }
    catch(error) {
        res.status(400).send('Error de consulata de usuario\n' + error)
    }
})

usersRouter.post('/', auth, async (req, res) => {
    const { fname, lname, age, email, password } = req.body
    try {
        const addUser = await userModel.create({ fname, lname, age, email, password })
        res.status(200).send('Usuario agregado')
    }
    catch(error) {  
        res.status(400).send('Error al agregar usuario')
    }
})

usersRouter.put('/:uid', auth, async (req, res) => {
    const { uid } = req.params
    const { fname, lname, age, email, password } = req.body
    try {
        const updateUser = await userModel.findByIdAndUpdate(uid, { fname, lname, age, email, password })
        res.status(200).send('Usuario modificado')
    }
    catch(error) {
        res.status(400).send('Error de actualizacion de usuario\n' + error)
    }
})

usersRouter.delete('/:uid', auth, async (req, res) => {
    const { uid } = req.params
    try {
        const deleteUser = await userModel.findByIdAndDelete(uid)
        res.status(200).send('Usuario eliminado')
    }
    catch(error) {
        res.status(400).send('Error de eliminacion de usuario\n' + error)
    }
})

export default usersRouter