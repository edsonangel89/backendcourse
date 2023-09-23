import { Router } from "express"
import { userModel } from "../models/users.models.js"

const sessionRouter = Router()

sessionRouter.post('/login', async (req, res) => {
    const { email, password } = req.body
    req.session.email = email
    req.session.password = password
    try {
        if (req.session.login) {
            res.send('OK')
        }
        const user = await userModel.findOne({email: email})
        if (user) {
            if (user.password == password) {
                req.session.login = true
                res.status(200).send('Usuario logueado')
            }
            else {
                res.status(401).send('Contrasena invalida')
            }
        }
        else {
            res.status(404).send('Usuario no encontrado')
        }
    }
    catch(error) {
        res.status(400).send('Error en login\n' + error)
    }
})

sessionRouter.get('/logout', (req, res) => {
    if (req.session.login) {
        req.session.destroy()
    }

    res.status(200).send('Usuario deslogueado')
})

export default sessionRouter