import { Router } from 'express';
import passport from 'passport';
const router = Router(); 

//Importar el controlador: 
import UserController from '../controllers/user.controller.js';
const userController = new UserController(); 

router.post("/register", userController.register); 
router.post("/login", userController.login); 
router.get("/current", passport.authenticate("jwt", {session: false}), (req, res) => userController.current(req, res, "home")); 
router.post("/logout", userController.logout); 

export default router;




/* import { Router } from "express";
import UserModel from "../dao/models/user.model.js";
import CartModel from "../dao/models/cars.model.js";
import passport from "passport";
import jwt from "jsonwebtoken";
import { createHash, isValidPassword } from "../util/hashbcryp.js";

const router = Router();

//Ruta para registrarse
router.post("/register", async (req, res) => {
    const { firstName, lastName, email, age, password, cart = null} = req.body;
    //console.log(usuario, password); 
    console.log("Primer Nombre: ", firstName);
    console.log("Apellido: ", lastName);
    console.log("Email: ", email);
    console.log("Edad: ", age);
    console.log("Contraseña: ", password);
    console.log("Carrito: ", cart);
    try {
        //Primero verificamos que el usuario este disponible: 
        const existeUsuario = await UserModel.findOne({ email });

        if (existeUsuario) {
            return res.status(400).send("El usuario ya existe");
        }

        // Crear un nuevo carrito
        const nuevoCarrito = new CartModel({ products: [] });
        const carritoCreado = await nuevoCarrito.save(); // Guardar el carrito en la base de datos

        //Creamos un nuevo usuario: 

        const nuevoUsuario = new UserModel({
            first_name: firstName,
            last_name: lastName,
            email: email,
            age: parseInt(age),
            password: createHash(password),
            cart: carritoCreado._id // O puedes asignar un ObjectId válido si ya tienes un carrito creado            
        });



        await nuevoUsuario.save();

        //Opcion a: generando el token
        //Opcion b: redirigir a login

        const token = jwt.sign({ usuario: nuevoUsuario.first_name, rol: nuevoUsuario.role }, "coderhouse", { expiresIn: "1h" });
        console.log(token);

        //Lo mandamos con la cookie: 
        res.cookie("coderCookieToken", token, {
            maxAge: 3600000, //1 horita seria,
            httpOnly: true
        })

        res.redirect("/api/sessions/current");
        //res.redirect("/products");
    } catch (error) {
        res.status(500).send("Mensaje tragico, error fatal");
    }
})

//Ruta Login: 

router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    console.log("El Email: ", email);
    console.log("El Password: ", password);

    try {
        //Buscar al usuario en MongoDB: 
        const usuarioEncontrado = await UserModel.findOne({ email });
        console.log("Usuario Encontrado: ", usuarioEncontrado);
        //Verifico si existe
        if (!usuarioEncontrado) {
            return res.status(401).send("Usuario no valido");
        }

        //Verificamos la contraseña
        if (!isValidPassword(password, usuarioEncontrado)) {
            return res.status(401).send("Contraseña incorrecta");
        }

        //Generamos el Token de JWT: 
        const token = jwt.sign({ usuario: usuarioEncontrado.first_name, rol: usuarioEncontrado.role }, "coderhouse", { expiresIn: "1h" });
        console.log(token);

        //Lo mandamos con la cookie: 
        res.cookie("coderCookieToken", token, {
            maxAge: 3600000, //1 horita seria,
            httpOnly: true
        })
        res.redirect("/api/sessions/current");
        //res.redirect("/products");
    } catch (error) {
        res.status(500).send("Mensaje tragico, error fatal");
    }
})

//Estrategia Current: 

router.get("/current", passport.authenticate("current", { session: false }), (req, res) => {
    res.render("home", { usuario: req.user.usuario });
})

//Logout: 

router.post("/logout", (req, res) => {
    //Limpiamos la cookie que contiene el token: 
    res.clearCookie("coderCookieToken");

    //Puedo decirle que se vaya al login nuevamente: 
    res.redirect("/login");
})

//Ruta Admin: 

router.get("/admin", passport.authenticate("current", { session: false }), (req, res) => {
    if (req.user.rol !== "admin") {
        console.log("El rol es distinto");
        return res.status(403).send("Acceso Denegado!, ladron, rata de dos patas, hackeeer malvado!");
    }
    
    res.render("admin", { usuario: req.user.usuario });
})


export default router; */