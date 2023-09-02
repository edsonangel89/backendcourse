import { Schema, model} from 'mongoose'

const productSchema = new Schema({
    title: String,
    description: String,
    code: {
        type: String,
        unique: true
    },
    price: Number,
    status: {
        type:Boolean, 
        default:true},
    stock: Number,
    category: String,
    thumbnail: String
})

export const productModel = model('products',productSchema)