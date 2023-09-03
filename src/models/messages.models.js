import { Schema, model } from "mongoose";

const messageSchema = new Schema({
    email: {
        type: String,
        require: true
    },
    message: {
        type: String,
        require: true
    },
    data: {
        type: Date,
        default: Date.now
    }
})

export const messageModel = model('messages',messageSchema)