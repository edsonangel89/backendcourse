import { Schema, model } from 'mongoose'
const messagesCollection = 'Messages'
const messageSchema = new Schema({
    user: {
        type: String,
        require: true
    },
    body: {
        type: String,
        require: true
    },
    meta: {
        type: Date,
        default: Date.now
    }
})

export const messageModel = model(messagesCollection, messageSchema)