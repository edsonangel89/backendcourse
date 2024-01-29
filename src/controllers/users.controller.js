import { userModel } from "../models/users.models.js"
import { send } from "../utils/mailer.js"
import { createHash, validatePass } from "../utils/bcrypt.js"

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

export const verifyUser = async (req, res) => {
    const { email } = req.body
    try {
        const user = await userModel.findOne({ email: email })
        if (user) {
            if (send(user.fname, user.email)) {
                res.status(200).render('mail_sent', {})
            }
            else {
                res.status(400).send('Error al enviar correo de restauracion')
            }
        }
        else {
            res.status(404).render('non_exist_user',{})
        }
    }
    catch (error) {
        res.status(400).send('Error al reestablecer contrasena\n' + error)
    }
}

export const updatePassword = async (req, res) => {
    const { fpassword, spassword } = req.body
    const { email } = req.params
    if (fpassword != spassword) {
        res.status(404).send('Passwords dont match')
    }
    try {
        const user = await userModel.findOne({email: email})
        if (user) {
            const { _id, fname, lname, age, email, password, role, cart } = user
            const newPassword = createHash(fpassword)
            const newUser = {
                fname: fname,
                lname: lname,
                age: age,
                email: email,
                password: newPassword,
                role: role,
                cart: cart
            }
            const modifiedUser = await userModel.findByIdAndUpdate(_id, newUser)
            res.redirect('/login',200,{})
        }
    }
    catch (error) {
        res.status(400).send('Error al restaurar contrasena')
    }
}

