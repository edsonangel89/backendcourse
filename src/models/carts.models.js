import { Schema, model } from 'mongoose'
const cartsCollection = 'Carts'
const cartSchema = new Schema({
    products: {
        type: [
            {
                id_product: {
                    type: Schema.Types.ObjectId,
                    ref: 'products',
                    required: true
                },
                quantity: {
                    type: Numberm,
                    required: true
                }
            }
        ],
        default: function() {
            return []
        }
    }
})

export const cartModel = model(cartsCollection, cartSchema)