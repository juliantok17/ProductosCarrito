import carsService from "../services/cars.service.js";

class CarsController {
    async createCart(req, res) {
        const nuevoCarrito = req.body;
        try {
            await carsService.addCart(nuevoCarrito);
            res.status(201).send("Carrito agregado correctamente");
        } catch (error) {
            res.status(500).send("Error en el servidor, no se pudo agregar el carrito");
        }
    }

    async getCartById(req, res) {
        const id = req.params.cid;
        try {
            const nuevoCarrito = await carsService.getCartPopulateById(id);
            console.log(nuevoCarrito);
            if (nuevoCarrito) {
                res.send(nuevoCarrito);
            } else {
                res.send("No se encontró el carrito");
            }
        } catch (error) {
            res.status(500).send(`Error del servidor al intentar cargar el carrito: ${error}`);
        }
    }

    async addProductCart(req, res) {
        console.log("Ingrese a Controller");
        const cid = req.params.cid;
        const pid = req.params.pid;
        const quantity = 1;
        
        try {
            const resultado = await carsService.addProductCart(cid, pid, quantity);

            if (resultado) {
                res.status(200).json({
                    success: true,
                    message: `Producto ${pid} agregado correctamente al carrito ${cid}`
                });
            } else {
                res.status(404).json({
                    success: false,
                    message: "El producto o el carrito no existen"
                });
            }
        } catch (error) {
            res.status(500).send(`Error del servidor al cargar carrito: ${error}`);
        }
    }

    async deleteProduct(req, res) {
        const cid = req.params.cid;
        const pid = req.params.pid;
        try {
            const resultado = await carsService.deleteProduct(cid, pid);
            if (resultado.success) {
                res.status(200).send(resultado.message); 
            } else {
                res.status(404).send(resultado.message);  
            }
        } catch (error) {
            res.status(500).send(`Error del servidor al intentar borrar el producto del carrito: ${error}`);
        }
    }

    async deleteProductsCart(req, res) {
        const id = req.params.cid;
        try {
            const resultado = await carsService.deleteProductsCars(id);
            if (resultado.success) {
                res.status(200).send(resultado.message);                
            } else {
                res.status(404).send(resultado.message);                
            }
        } catch (error) {
            res.status(500).send(`Error del servidor al intentar borrar los productos del carrito: ${error}`);
        }
    }

    async updateQuantityProduct(req, res) {
        const cid = req.params.cid;
        const pid = req.params.pid;
        const quantity = req.body.quantity;
        try {
            const resultado = await carsService.updateQuantityProduct(cid, pid, quantity);
            if (resultado.success) {
                res.status(200).send(resultado.message);  
            } else {
                res.status(404).send(resultado.message);
            }
        } catch (error) {
            res.status(500).send(`Error del servidor al intentar actualizar la cantidad del producto: ${error}`);
        }
    }

    async deleteCartById(req, res) {
        const cid = req.params.cid;
        try {
            const resultado = await carsService.deleteCart(cid);
            if (resultado.success) {
                res.status(200).send(resultado.message); 
            } else {
                res.status(404).send(resultado.message);
            }
        } catch (error) {
            res.status(500).send(`Error del servidor al intentar eliminar el carrito: ${error}`);
        }
    }


}

export default CarsController; 