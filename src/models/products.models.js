<<<<<<< HEAD
import { Schema, model } from 'mongoose'
=======
import { Schema, model } from "mongoose"
import paginate from 'mongoose-paginate-v2'

>>>>>>> paginate
const productsCollection = 'Products'
const productSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    code: {
        type: String,
        unique: true,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    status: {
        type: Boolean,
        default: true
    },
    stock: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    thumbnail: {
        type: Array,
        default: [] 
    }    
})

productSchema.plugin(paginate)

export const productModel = model(productsCollection, productSchema)