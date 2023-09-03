import {Schema, model} from 'mongoose'

const userSchema = new Schema({
    nombre: String,
    apellido: String,
    edad: Number,
    email: {
        type: String,
        unique: true
    },
    passport: String
})

export const userModel = model('users',userSchema)