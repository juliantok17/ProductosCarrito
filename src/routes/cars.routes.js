import { Router } from "express";
const router = Router();

import CarsController from "../controllers/cars.controller.js";
const carsController = new CarsController();

router.post("/", carsController.createCart);
router.get("/:cid", carsController.getCartById);
router.post("/:cid/products/:pid", carsController.addProductCart);
router.delete("/:cid", carsController.deleteProductsCart);
router.delete("/:cid/products/:pid", carsController.deleteProduct);
router.put("/:cid/products/:pid", carsController.updateQuantityProduct);
//router.delete("/cid", carsController.deleteCartById);

export default router;

/* router.post("/", async (req, res) => {    
    try {
        const nuevoCarrito = await manager.crearCarrito();
        res.status(201).send(nuevoCarrito);
    } catch (error) {
        res.status(500).send(`Error del servidor al intentar cargar el carrito: ${error}`)
    }    
})


//GET obtener carrito por id /:cid
router.get("/:cid", async (req, res) =>{
    const id = req.params.cid;
    try {
        const nuevoCars = await manager.getCarritoById(id);
        if (nuevoCars) {
            res.send(nuevoCars);
        } else {
            res.send("No se encontró el carrito")
        }
        
    } catch (error) {
        res.status(500).send(`Error del servidor al intentar cargar el carrito: ${error}`)
    }
    
})

//Cargar un producto al carrito si este producto ya existe en ese carrito debo incrementar su cantidad
//y en el caso de que no tenga ese producto crearlo ( o sea agregar el array con el pid y quantity).
router.post("/:cid/products/:pid", async (req, res) => {
    let idCarrito = req.params.cid;
    let idProducto = req.params.pid;
    
    try {
        const resultado = await manager.agregarProductoAlCarrito(idCarrito, idProducto);
        
        if (resultado) {
            res.status(200).json({
                success: true,
                message: `Producto ${idProducto} agregado correctamente al carrito ${idCarrito}`                
            });
        } else {
            res.status(404).json({
                success: false,
                message: "El producto o el carrito no existen"
            });  
        }       
    } catch (error) {
        res.status(500).send(`Error del servidor al cargar carrito: ${error}`)
    }
    
})

router.delete("/:cid", async (req, res) =>{
    let idCarrito = req.params.cid;
    try {
        const resultado = await manager.borrarProductosCarrito(idCarrito);
        if (resultado.success) {
            console.log(resultado.message);
        } else {
            console.error(resultado.message);
        }
    } catch (error) {
        res.status(500).send(`Error del servidor al intentar borrar los productos del carrito: ${error}`)
    }
})

router.delete("/:cid/products/:pid", async (req, res) =>{
    let idCarrito = req.params.cid;
    let idProducto = req.params.pid;
    try {
        const resultado = await manager.borrarProductoPorID(idCarrito, idProducto);
        if (resultado.success) {
            console.log(resultado.message);
        } else {
            console.error(resultado.message);
        }
    } catch (error) {
        res.status(500).send(`Error del servidor al intentar borrar los productos del carrito: ${error}`)
    }
})


router.put("/:cid/products/:pid", async (req, res) =>{
    let idCarrito = req.params.cid;
    let idProducto = req.params.pid;
    let quantity = req.body.quantity;
    try {
        const resultado = await manager.actualizarCantidadProducto(idCarrito, idProducto, quantity)
        if (resultado.success) {
            console.log(resultado.message);
        } else {
            console.error(resultado.message);
        }
    } catch (error) {
        res.status(500).send(`Error del servidor al intentar borrar los productos del carrito: ${error}`)
    }
})


export default router;
 */