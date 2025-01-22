import mongoose from "mongoose";
import ProductModel from "../models/products.model.js";
const nombreCollection = "cars"; 

const cartSchema = new mongoose.Schema({
    products: [
        {
          product: {
            type: mongoose.Schema.Types.ObjectId, // Referencia a otro documento (producto)
            ref: 'products', // Nombre del modelo referenciado
            required: true
          },
          quantity: {
            type: Number,
            required: true,
            min: 1 // Cada producto debe tener al menos 1 unidad
            //default: 1
          }
        }
      ]
})

const cartModel = mongoose.model(nombreCollection, cartSchema); 

export default cartModel; 