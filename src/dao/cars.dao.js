import CartModel from "./models/cars.model.js";

class CarsDao {
    // Guardar un carrito
    async save() {
        const cart = new CartModel({ products: [] });
        return await cart.save();
    }

    // Obtener un carrito por su ID
    async findById(id) {
        return await CartModel.findById(id);
    }

    async findByIdPopulate(id) {
        return await CartModel.findById(id).populate("products.product");
    }

    // Obtener un producto que coincida con una consulta específica
    async deleteProduct(cid, pid) {
        return await CartModel.updateOne(
            { _id: cid },
            { $pull: { products: { product: pid } } }
        );
    }    

    async updateQuantityProduct (cid, pid, quantity) {
        return await CartModel.updateOne(
            { _id: cid, "products.product": pid },
            { $set: { "products.$.quantity": quantity } }
        );
    }

    async delete(id) {
        const objectId = new mongoose.Types.ObjectId(id);
        const deleteCars = await CartModel.findByIdAndDelete(objectId);
        return deleteCars;
    }

}

export default new CarsDao;