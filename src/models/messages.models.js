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
                meta: {
                    type: [
                        {
                            date: {
                                type: Date,
                                required: true,
                                default: Date.now
                            },
                            fav: {
                                type: Number,
                                default: 0
                            }
                        }
                    ]
                }
            }
        ]
    }
})

export const messageModel = model(messagesCollection, messageSchema)