import { Schema, model } from 'mongoose'
const cartsCollection = 'Carts'
const cartSchema = new Schema({
    id: {
        type: Number,
        require: true
    },
    quantity: {
        type: Number,
        require: true
    }
})

export const cartModel = model(cartsCollection, cartSchema)