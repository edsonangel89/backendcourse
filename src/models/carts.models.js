import { Schema, model } from "mongoose";

const cartSchema = new Schema({
    _id: {
        type: Schema.Types.ObjectId,
        require: true },
    quantity: {
        type: Number,
        require: true
    }    
})

export const cartModel = model('carts',cartSchema)