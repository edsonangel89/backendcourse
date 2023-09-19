import { Schema, model } from 'mongoose'

const messagesCollection = 'Messages'
const messageSchema = new Schema({
    message: {
        type: [
                {
                    usremail: {
                        type: String,
                        required: true
                    },
                    body: {
                        type: String,
                        required: true
                    },
                    date: {
                        type: Date,
                        default: Date.now
                    }
                }
            ]
    }
})

export const messageModel = model(messagesCollection, messageSchema)