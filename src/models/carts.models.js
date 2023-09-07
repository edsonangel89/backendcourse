import { Schema, model } from 'mongoose'

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

const cartModel = model('Carts',cartSchema)