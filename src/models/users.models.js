import { Schema, model } from 'mongoose'
import { cartModel } from './carts.models.js'

const usersCollection = 'Users'
const userSchema = new Schema({
    fname: {
        type: String,
        require: true
    },
    lname: {
        type: String,
        require: true
    },
    age: {
        type: Number,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    },
    role: {
        type: String,
        default: 'user'
    },
    cart: {
        type: Schema.Types.ObjectId,
        ref: 'Carts'
    }
})

userSchema.pre('save', async function() {
    try {
        const newCart = await cartModel.create({})
        this.cart = newCart._id
    }
    catch(error) {
        next(error)
    }
})

export const userModel = model(usersCollection, userSchema)

