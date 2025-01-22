import cartDTO from "../dto/cart.dto.js";
import carsRepository from "../repository/cars.repository.js";

class CarsService {

    async addCart() {
        // LLamo al metodo para agregar un nuevo carrito
        return await carsRepository.createCart();
    }

    async getCartById(id) {
        const cart = carsRepository.getCartById(id);
        if (!cart) throw new Error("Carrito no encontrado");
        return cart;
    }

    async getCartPopulateById(id) {
        const cartPopulate = carsRepository.getPopulateById(id);
        if (!cartPopulate) throw new Error("Carrito no encontrado");
        return cartPopulate;
    }

    async addProductCart (cid, pid, quantity) {
        
        const carrito = await carsRepository.getCartById(cid);
        
        if (!carrito) {
            throw new Error("No existe un carrito con ese ID");
        }
        
        // Verificar si el producto ya existe en el carrito
        const existeProducto = carrito.products.find(producto =>
            producto.product && producto.product.equals(pid)
        );
        
        if (existeProducto) {            
            // Si ya existe, incrementa la cantidad
            existeProducto.quantity += quantity;
        } else {           
            // Si no existe, lo agrega al carrito
            carrito.products.push({ product: pid, quantity });           
        }
        
        // Guardar cambios en el carrito
        await carrito.save();        
        return carrito;
    }

    async deleteProduct(cid, pid) {
        const resultado = await carsRepository.deleteProductById(cid, pid);
        if (resultado.modifiedCount === 0) {
            console.error(`Producto con ID ${pid} no encontrado en el carrito con ID ${cid}`);
            return { success: false, message: `Producto no encontrado en el carrito` };
        }

        return { success: true, message: `Producto con ID:${pid} eliminado correctamente del carrito` };
    }

    async deleteProductsCars(id) {
        const carrito = carsRepository.getCartById(id);
        if (!carrito) {
            return { success: false, message: `El carrito con ID ${id} no existe` };
        }
        carrito.products = [];

        await carrito.save();

        return { success: true, message: `Productos del carrito con ID:${id} eliminados correctamente` };
    }

    async updateQuantityProduct(cid, pid, quantity) {
        if (!quantity || isNaN(quantity) || !Number.isInteger(Number(quantity))) {
            return { success: false, message: "La cantidad debe ser un entero" };
        }

        //Verifica que la cantidad no sea negativa
        if (quantity < 0) {
            return { success: false, message: "La cantidad no puede ser negativa." };
        }

        const resultado = carsRepository.updateQuantityProduct(cid, pid, quantity);

        if (resultado.modifiedCount === 0) {
            return { success: false, message: `No se encontró el producto con ID:${pid} en el carrito con ID:${cid}.` };
        }

        return { success: true, message: `Cantidad actualizada correctamente a ${quantity} para el producto con ID:${pid}.` };
    }

    async deleteCart(id) {
        const resultado = await carsRepository.deleteCars(id);
        if(resultado){
            return { success: true, message: `El carrito con ID: ${pid} fue eliminado correctamente.` };
        } else {
            return { success: true, message: `El carrito con ID: ${pid} no pudo ser encontrado para eliminarlo.` };
        }
    }







}

export default new CarsService();