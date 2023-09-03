import { Schema, model} from 'mongoose'

const productSchema = new Schema({
    title: {
        type: String,
        require: true },
    description: {
        type: String,
        require: true },
    code: {
        type: String,
        unique: true
    },
    price: {
        type: Number,
        require: true },
    status: {
        type:Boolean, 
        default:true},
    stock: {
        type: Number,
        require: true },
    category: {
        type: String,
        require: true },
    thumbnail: String
})

export const productModel = model('products',productSchema)