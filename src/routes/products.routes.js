import { Router } from "express";
const router = Router();

import ProductsController from "../controllers/products.controller.js";
const productsController = new ProductsController();



//Generar ruta raiz "/" Get que traera todos los productos incluyendo limit
router.get("/", productsController.listProducts);

//Generar ruta GET /pid trae el producto correspondiente al id proporcionado.
router.get("/:pid", productsController.getProductById);

//Ruta Post debe agregar un nuevo producto
router.post("/", productsController.createProduct);

//Editar Producto.
router.put("/:pid", productsController.updateProduct);

//Delete /:pid
router.delete("/:pid", productsController.deleteProduct);



/* //Generar ruta raiz "/" Get que traera todos los productos incluyendo limit
router.get("/", async (req, res)=>{
    let limit = req.query.limit;
    try {
        const arrayProductos = await manager.getProducts();
        if(limit){
            res.send(arrayProductos.slice(0, limit));
        }else{
            res.send(arrayProductos);
        }
    } catch (error) {
        res.status(500).send(`Error del servidor: ${error}`);
    }    
})


    
//Generar ruta GET /pid trae el producto correspondiente al id proporcionado.
router.get("/:pid", async (req, res) => {
    let id = req.params.pid;
    try {
        let productoPorID = await manager.getProductById(id);  
        
        if (productoPorID){            
            res.send(productoPorID);
        }else{
            res.send("Producto no encontrado.");
        }
    } catch (error) {
        res.status(500).send(`Error del servidor: ${error}`);
    }
    
})



//Ruta Post debe agregar un nuevo producto
//id : String (se autogenera)
//title : String
//descripcion : String
//code : String
//price : Number
//status : Boolean
//stock : Number
//categoria : String
//thumbnails: array de string que tenga las rutas donde estan almacenadas las imagenes referentes a dicho producto.
//"¡¡¡¡ Status es true por defecto, todos los campos son obligatorios, a excepcion de thumbnails"
router.post("/", async (req, res) => {
    const nuevoProducto = req.body;
    try {
        await manager.addProduct(nuevoProducto);
        res.status(201).send("Producto agregado correctamente");
    } catch (error) {
        res.status(500).send(`Error del servidor: ${error}`);    
    }
})


//put /:pid
router.put("/:pid", async (req, res) => {
    const id = req.params.pid;
    const nuevoProducto = req.body;
    
    try {
        let nuevoProdUpdate = await manager.updateProduct(id, nuevoProducto);
        
        if (nuevoProdUpdate) {                       
            res.status(200).send(`Producto con id: ${id}, editado correctamente`); 
        } else {
            res.send("El producto no pudo ser encontrado.");
        }
        
    } catch (error) {
        res.status(500).send(`Error del servidor: ${error}`); 
    }
})



//Delete /:pid
router.delete("/:pid", async (req, res) => {
    const id = req.params.pid;
    try {

        let existeElProducto = await manager.productoExiste(id);
        if (existeElProducto) {
            await manager.deleteProduct(id);        
            res.status(201).send(`Producto con id: ${id}, borrado correctamente`);
        } else {
            res.send("El ID del Producto a borrar no existe.");
        }               
        
    } catch (error) {
        res.status(500).send(`Error del servidor: ${error}`); 
    }
    
}) */




export default router;
