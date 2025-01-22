import ProductModel from "./models/products.model.js";

class ProductsDao {

    // Obtener todos los productos de la base de datos
    async getAll() {
        return await ProductModel.find().lean();
    }

    // Obtener productos paginados
    async getPaginated(limit, page) {
        return await ProductModel.paginate({}, { limit, page });
    }

    // Obtener un producto por su ID
    async findById(id) {
        return await ProductModel.findById(id);
    }

    // Obtener un producto que coincida con una consulta específica
    async findOne(query) {
        return await ProductModel.findOne(query);
    }

    // Guardar un producto (reutilizando lógica de creación)
    async save(productData) {
        const product = new ProductModel(productData);
        return await product.save();
    }

    async update(id, productData) {
        // Convertir el ID a ObjectId
        const objectId = new mongoose.Types.ObjectId(id);
        const updatedProduct = await ProductModel.findByIdAndUpdate
            (
                objectId,
                { $set: productData },
                { new: true } // Retorna el documento actualizado
            );
        return updatedProduct;
    }

    async delete(id) {
        const objectId = new mongoose.Types.ObjectId(id);
        const deletedProduct = await ProductModel.findByIdAndDelete(objectId);
        return deletedProduct;
    }

}

export default new ProductsDao;