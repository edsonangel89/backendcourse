import { Schema, model } from 'mongoose'
const messageCollection = 'Messages'
const messageSchema = new Schema({
    user: {
        type: String,
        require: true
    },
    message: {
        type: String,
        require: true
    }
})

const messageModel = model(messageCollection, messageSchema)