import { Router } from "express";
const router = new Router();
import productsService from "../services/products.service.js";
import carsService from "../services/cars.service.js";
import { soloAdmin, soloUser } from "../middleware/auth.js";
import passport from "passport";

import userService from "../services/user.service.js";


router.get("/products", passport.authenticate("jwt", { session: false }), soloUser, async (req, res) => {
    //tengo que recupera todos mis productos y mandarselo a la vista:
    let page = req.query.page || 1;
    let limit = 4;

    try {
        const userDTO = req.user ? await userService.generarDTO(req.user) : null;
        const productos = await productsService.getPaginatedProducts(limit, page);

        //console.log(productos);
        const productosFinal = productos.docs.map(producto => {
            return producto.toObject();
        })

        res.render("index", {
            user: userDTO,
            productos: productosFinal,
            hasPrevPage: productos.hasPrevPage,
            hasNextPage: productos.hasNextPage,
            prevPage: productos.prevPage,
            nextPage: productos.nextPage,
            currentPage: productos.page,
            totalPages: productos.totalPages
        });
    } catch (error) {
        res.status(500).send("Error interno del servidor");
    }
})

//Renderiza realtimeproducts con WebSockets
router.get("/realtimeproducts", passport.authenticate("jwt", { session: false }), soloAdmin, async (req, res) => {
    try {
        res.render("realtimeproducts");
    } catch (error) {
        res.status(500).send("Error interno del servidor");
    }

})



router.get("/carts/:cid", passport.authenticate("jwt", { session: false }), soloUser, async (req, res) => {

    const idCarrito = req.params.cid
    const user = req.user; // Usuario autenticado

    try {       
        
        // Verificar si el carrito solicitado pertenece al usuario autenticado
        if (user.cart.toString() !== idCarrito) {
            return res.status(403).send('No estás autorizado para acceder a este carrito');
        }

        const carrito = await carsService.getCartPopulateById(idCarrito);

        if (!carrito) {
            return res.status(404).json({ success: false, message: "Carrito no encontrado" });
        }

        const productos = carrito.products
            .filter(item => item.product !== null) // Filtra los productos donde 'product' no es null
            .map(item => ({
                ...item.product.toObject(),
                quantity: item.quantity
            }));

        //res.json(productos); // Enviar directamente el carrito
        res.render("carts", { productos: productos, idCarrito });
    } catch (error) {
        res.status(500).send("Error interno del servidor");
    }

})

router.get("/login", (req, res) => {
    res.render("login");
})

router.get("/register", (req, res) => {
    res.render("register");
})


export default router;