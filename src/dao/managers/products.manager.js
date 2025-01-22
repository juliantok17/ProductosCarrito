import mongoose from "mongoose";
import ProductModel from "../models/products.model.js";

class ProductManager {   

    // Agregar un producto a la base de datos
    async addProduct({ title, description, price, img, code, stock }) {
        try {
            if (!title || !description || !price || !img || !code || !stock) {
                console.log("Todos los campos son obligatorios");
                return;
            }

            // Validación: verificar si el código ya existe en la base de datos
            const existingProduct = await ProductModel.findOne({ code });
            if (existingProduct) {
                console.log("El código debe ser único");
                return;
            }

            // Crear el producto en la base de datos
            const newProduct = new ProductModel({ title, description, price, img, code, stock });
            const savedProduct = await newProduct.save();
            console.log("Producto agregado:", savedProduct);
        } catch (error) {
            console.error("Error al agregar el producto:", error);
        }
    }

    // Obtener todos los productos de la base de datos
    async getProducts() {
        try {
            const products = await ProductModel.find().lean(); //lean() envia los los objetos en texto plano
            return products;
        } catch (error) {
            console.error("Error al obtener los productos:", error);
        }
    }

    //getPaginatedProducts Obtiene los productos por paginas    
    async getPaginatedProducts(page, limit) {
        console.log(page);
        console.log(limit);
        try {
            const paginatedProducts = await ProductModel.paginate({}, { limit, page });
            //console.log(paginatedProducts);
            return paginatedProducts;
        } catch (error) {
            console.error("Error al obtener los productos paginados:", error);
        }
    }

    // Obtener un producto por su ID
    async getProductById(id) {
        try {
            const product = await ProductModel.findById(id);
            if (!product) {
                console.log("Producto no encontrado");
                return null;
            }
            return product;
        } catch (error) {
            console.error("Error al buscar producto por ID:", error);
        }
    }

    // Actualizar un producto por su ID
    async updateProduct(id, productoActualizado) {
        
        try {
            // Convertir el ID a ObjectId
            const objectId = new mongoose.Types.ObjectId(id);

            const updatedProduct = await ProductModel.findByIdAndUpdate(
                objectId,
                { $set: productoActualizado },
                { new: true } // Retorna el documento actualizado
            );

            if (!updatedProduct) {
                console.log("No se encontró el producto para actualizar");
                return;
            }

            console.log("Producto actualizado:", updatedProduct);

            return updatedProduct;
        } catch (error) {
            console.error("Error al actualizar el producto:", error);
        }
    }

    // Eliminar un producto por su ID
    async deleteProduct(id) {        
        try {
            // Convertir el ID a ObjectId
            const objectId = new mongoose.Types.ObjectId(id);

            const deletedProduct = await ProductModel.findByIdAndDelete(objectId);
            if (!deletedProduct) {
                console.log("No se encontró el producto para eliminar");
                return;
            }
            console.log("Producto eliminado:", deletedProduct);
        } catch (error) {
            console.error("Error al eliminar el producto:", error);
        }
    }
}

export default ProductManager;
