import { productModel } from "../models/products.models.js"
import { userModel } from "../models/users.models.js"

export const getRoot = async (req, res) => {
    try {
        res.status(200).render('loginlogout', { 
            title: 'Login'
        })
    }
    catch (error) {
        res.status(400).send('Error de consulta en raiz\n' + error)
    }
}

export const getHome = async (req, res) => {
    try {
        const products = await productModel.find()
        const user = await userModel.findOne({_id: req.session.passport.user})
        if (user) {
            res.status(200).render('home', {
                title: 'Home',
                productsList: products,
                name: user.fname
            })
        }
        else {
            res.status(404).send('Usuario no encontrado')
        }
    }
    catch (error) {
        res.status(400).send('Error al consultar vistas\n' + error)
    }
}

export const getRtp = async (req, res) => {
    try {
        const user = await userModel.findOne({_id: req.session.passport.user})
        const productsList = await productModel.find()
        res.status(200).render('realTimeProducts', {
            productsList,
            title: 'Real Time',
            name: user.fname
        })
    }
    catch (error) {
        res.status(400).send('Error al consultar vista en tiempo real\n' + error)
    }
}

export const postRtp = async (req, res) => {
    const { title, description, code, price, stock, category } = req.body
    try {
        const user = await userModel.findOne({email: req.session.email})
        await productModel.create({ title, description, code, price, stock, category })
        const productsList = await productModel.find()
        res.status(200).render('realTimeProducts', {
            productsList,
            title: 'Real Time',
            name: user.fname
        })
    }
    catch (error) {
        res.status(400).send('Error al agreagar articulos\n' + error)
    }
}

export const delRtp = async (req, res) => {
    const { pid } = req.params
    try {
        const user = await userModel.findOne({email: req.session.email})
        await productModel.findByIdAndDelete(pid)
        const producstList = await productModel.find()
        res.status(200).render('realTimeProducts', {
            producstList,
            title: 'Real Time',
            name: user.fname
        })
    }
    catch (error) {
        res.status(400).send('Error al borrar el producto por medio de las vistas\n' + error)
    }
}