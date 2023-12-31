import mongoose from 'mongoose'
import { getProducts, getProductId, addProduct, updateProduct, deleteProduct } from '../src/controllers/products.controller.js'
import Assert from 'assert'

mongoose.connect('mongodb+srv://edsonangel:Sabiduria89@cluster0.htyzerk.mongodb.net/?retryWrites=true&w=majority')

const assert = Assert.strict

describe('Test de productos', () => {
    before()
    it('Test debe obtener una lista de todos los productos', () => {

    })
    it('Test debe obtener un producto llamado por su id', () => {

    })
    it('Test debe guardar un producto en un carrito', () => {

    })
    beforeEach()
})