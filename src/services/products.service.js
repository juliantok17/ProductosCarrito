import ProductDTO from "../dto/product.dto.js";
import productsRepository from "../repository/products.repository.js"

class ProductsService {
    // Agregar un producto a la base de datos
    async addProduct(productData) {
        // Validación: verificar si el código ya existe en la base de datos
        const existingProduct = await productsRepository.getProductByCode(productData.code);
        if (existingProduct) throw new Error("El código debe ser único");            

        // Crear el producto en la base de datos
        return await productsRepository.createProduct(productData);
    }

    // Obtener todos los productos de la base de datos
    async getProducts() {
        const products = await productsRepository.getAllProducts();
        return products;
    }

    //getPaginatedProducts Obtiene los productos por paginas    
    async getPaginatedProducts(limit, page) {
        const paginatedProducts = await productsRepository.getProductsPaginated(limit, page);
        return paginatedProducts;
    }

    // Obtener un producto por su ID
    async getProductById(id) {
        const product = await productsRepository.getProductById(id);
        if (!product) throw new Error("Producto no encontrado");

        return product;
    }

    // Actualizar un producto por su ID
    async updateProduct(id, productoActualizado) {

        const updatedProduct = await productsRepository.updateProduct(id, productoActualizado);

        if (!updatedProduct) throw new Error("No se encontró el producto para actualizar");

        return updatedProduct;
    }

    // Eliminar un producto por su ID
    async deleteProduct(id) {
        // Convertir el ID a ObjectId
        const objectId = new mongoose.Types.ObjectId(id);

        const deletedProduct = await productsRepository.deleteProduct(objectId);

        if (!deletedProduct) throw new Error("No se encontró el producto para eliminar");

        return deletedProduct;
    }

}

export default new ProductsService();