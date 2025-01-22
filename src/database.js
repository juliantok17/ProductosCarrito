import mongoose from "mongoose";

mongoose.connect("mongodb+srv://juliantok17:tokonas@tokocluster.vahux.mongodb.net/CarritoCompras?retryWrites=true&w=majority&appName=TokoCluster") 
    .then(() => {
        console.log("Conectado a MongoDB")
    })
    .catch((error) => {
        console.log("No se pudo conectar a MongoDB: ", error)
    })

