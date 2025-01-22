import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const nombreCollection = "products"; 

const productSchema = new mongoose.Schema({
      title: {
        type: String,
        required: true     
      },
      description: {
        type: String        
      },
      price: {
        type: Number,
        required: true,
        min: 0
      },
      img: {
        type: String        
      },
      code: {
        type: String,
        required: true,
        unique: true        
      },
      stock: {
        type: Number,
        required: true,
        min: 0
      }
})

//Usamos el plugin
productSchema.plugin(mongoosePaginate);

const productModel = mongoose.model(nombreCollection, productSchema); 



export default productModel; 