import { Schema, model } from 'mongoose'

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
    cart: {
        type: Schema.Types.ObjectId,
        ref: 'Carts'
    },
    role: {
        type: String,
        default: 'user'
    }
})

export const userModel = model(usersCollection, userSchema)

