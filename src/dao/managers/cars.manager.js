import mongoose from "mongoose";
import CartModel from "../models/cars.model.js";

class CartManager {
    // Crear un carrito en la base de datos
    async crearCarrito() {
        try {
            const nuevoCarrito = await CartModel.create({ products: [] });
            return nuevoCarrito;
        } catch (error) {
            console.error("Error al crear el carrito:", error);
            //throw new Error("Error al crear el carrito");
        }
    }

    // Obtener un carrito por su ID desde MongoDB
    async getCarritoById(id) {
        try {
            const carrito = await CartModel.findById(id).populate("products.product"); // Popula la referencia a productos
            if (!carrito) {
                throw new Error("No existe un carrito con ese ID");
            }
            return carrito;
        } catch (error) {
            console.error("Error al obtener el carrito por ID:", error);
            throw new Error("Error al obtener el carrito");
        }
    }

    // Agregar un producto al carrito en la base de datos
    async agregarProductoAlCarrito(carritoId, productoId, quantity = 1) {
        try {
            const carrito = await this.getCarritoById(carritoId);
            if (!carrito) {
                throw new Error("No existe un carrito con ese ID");
            }

            // Verificar si el producto ya existe en el carrito
            const existeProducto = carrito.products.find(producto =>
                producto.product && producto.product.equals(productoId)
            );

            if (existeProducto) {
                // Si ya existe, incrementa la cantidad
                existeProducto.quantity += quantity;
            } else {
                // Si no existe, lo agrega al carrito
                carrito.products.push({ product: productoId, quantity });
            }

            // Guardar cambios en el carrito
            await carrito.save();
            return carrito;
        } catch (error) {
            console.error("Error al agregar el producto al carrito:", error);
            //throw new Error("Error al agregar el producto al carrito");
        }
    }

    //DELETE api/carts/:cid Elimina todos los productos del carrito seleccionado.
    async borrarProductosCarrito(id) {
        try {
            const carrito = await CartModel.findById(id);

            if (!carrito) {
                return { success: false, message: `El carrito con ID ${id} no existe` };
            }

            carrito.products = [];

            await carrito.save();

            return { success: true, message: `Productos del carrito con ID:${id} eliminados correctamente` };

        } catch (error) {
            console.error("Error al intentar borrar los productos del carrito:", error);
            return { success: false, message: "Error al intentar borrar los productos del carrito" };
        }
    }

    //DELETE api/carts/:cid/products/:pid
    //Debe eliminar un producto seleccionado del carrito sin importar la cantidad.
    async borrarProductoPorID(cid, pid) {
        try {
            //Uso $pull para eliminar el producto del arreglo 'products'
            const resultado = await CartModel.updateOne(
                { _id: cid },
                { $pull: { products: { product: pid } } }
            );

            if (resultado.modifiedCount === 0) {
                console.error(`Producto con ID ${pid} no encontrado en el carrito con ID ${cid}`);
                return { success: false, message: `Producto no encontrado en el carrito` };
            }

            return { success: true, message: `Producto con ID:${pid} eliminado correctamente del carrito` };
        
        } catch (error) {
            console.error("Error al intentar borrar el producto del carrito:", error);
            return { success: false, message: "Error al intentar borrar el producto del carrito" };
        }
    }



    //PUT api/carts/:cid/products/:pid
    //Debe actualizar solo la cantidad de un producto especifico de un carrito.
    //el valor de la cantidad se envia por req.body
    async actualizarCantidadProducto(cid, pid, quantity) {
        try {

            if (!quantity || isNaN(quantity) || !Number.isInteger(Number(quantity))) {                
                return { success: false, message: "La cantidad debe ser un entero" };           
            }

            //Verifica que la cantidad no sea negativa
            if (quantity < 0) {
                return { success: false, message: "La cantidad no puede ser negativa." };
            }            
    
            //$set para actualizar la cantidad de un producto
            const resultado = await CartModel.updateOne(
                { _id: cid, "products.product": pid },
                { $set: { "products.$.quantity": quantity } }
            );
    
            if (resultado.modifiedCount === 0) {
                return { success: false, message: `No se encontró el producto con ID:${pid} en el carrito con ID:${cid}.` };
            }
    
            return { success: true, message: `Cantidad actualizada correctamente a ${quantity} para el producto con ID:${pid}.` };
        } catch (error) {
            console.error("Error al intentar actualizar la cantidad del producto:", error);
            return { success: false, message: "Error al intentar actualizar la cantidad del producto." };
        }
    }


    //PUT api/carts/:cid Este no lo entiendo!!!!
    //Debe actualizar todos los productos del carrito con un arreglo de productos.




}




export default CartManager; 