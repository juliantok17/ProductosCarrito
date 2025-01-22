import carsDao from "../dao/cars.dao.js";

class CarsRepository {
    async createCart () {
        return await carsDao.save();
    }

    async getCartById (id) {
        return await carsDao.findById(id);
    }

    async getPopulateById (id) {
        return await carsDao.findByIdPopulate(id);
    }

    async deleteProductById (cid, pid) {
        return await carsDao.deleteProduct(cid, pid);
    }

    async updateQuantityProduct (cid, pid, quantity) {
        return await carsDao.updateQuantityProduct(cid, pid);
    }

    async deleteCars (id) {
        return await carsDao.delete(id);
    }


}

export default new CarsRepository();