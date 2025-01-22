import productsDao from "../dao/products.dao.js";

class ProductsRepository {
    async createProduct(productData) {
        return await productsDao.save(productData);
    }

    async getProductById(id) {
        return await productsDao.findById(id);         
    }

    async getProductByCode(code){
        return await productsDao.findOne(code);
    }

    async getAllProducts() {
        return await productsDao.getAll();
    }

    async getProductsPaginated(limit, page){
        return await productsDao.getPaginated(limit, page);
    }

    async updateProduct(id, productData) {
        return await productData.updateProduct(id, productData);
    }

    async deleteProduct(id) {
        return await productsDao.delete(id);
    }

}

export default new ProductsRepository(); 