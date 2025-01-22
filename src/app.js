import express from "express";
import productsRouter from "./routes/products.routes.js";
import carsRouter from "./routes/cars.routes.js";
import viewsRouter from "./routes/views.routes.js"
import cookieParser from "cookie-parser";
import passport from "passport";
import initializePassport from "./config/passport.config.js";
import "./database.js";
import ProductManager from "./dao/managers/products.manager.js";
import sessionRouter from "./routes/sessions.routes.js";
const managerP = new ProductManager();
import { engine } from "express-handlebars";
import { Server } from "socket.io";
const app = express();
const PUERTO = 3000;

//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("./src/public"));
app.use(cookieParser());

//Passport
app.use(passport.initialize());
initializePassport();

//Express-Handlebars
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");

// RUTAS:
app.get("/", (req, res) => {
    res.send("Esta es mi pagina, José Julián Tokonas");
})

app.use("/api/cars", carsRouter);

app.use("/api/sessions", sessionRouter)

// Usar el router de productos en la ruta /products
app.use("/api/products", productsRouter);
app.use("/", viewsRouter);


const httpServer = app.listen(PUERTO, () => {
    console.log(`Escuchando el el puerto: http://localhost:${PUERTO}`);
})

const io = new Server(httpServer);

io.on("connection", async (socket) => {
    console.log("Un cliente se conectó");

    //Vamos a recibir el envio del front para borrar un producto. 
    socket.on("deleteProduct", async (id) => {
        try {
            await managerP.deleteProduct(id);
            socket.emit("productos", await managerP.getProducts());
        } catch (error) {
            console.error("Error al eliminar el producto:", error);
        }
    })

    //Emviamos el array de productos: 
    socket.emit("productos", await managerP.getProducts());

    // Escucha el envio del formulario del cliente para agregar un nuevo producto.
    socket.on("newProduct", async (newProduct) => {
        try {
            // Guardar el nuevo producto en tu sistema (por ejemplo, usando ProductManager)
            await managerP.addProduct(newProduct);            

            // Emitir la lista actualizada de productos a todos los clientes conectados
            socket.emit("productos", await managerP.getProducts());
        } catch (error) {
            console.error("Error al agregar el producto:", error);
        }
    });
})







