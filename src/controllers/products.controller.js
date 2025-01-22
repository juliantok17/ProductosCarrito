import productsService from "../services/products.service.js";

class ProductsController {
    async createProduct (req, res) {
        const nuevoProducto = req.body;
        try{
            await productsService.addProduct(nuevoProducto);
            res.status(201).send("Producto agregado correctamente");
        } catch (error) {
            res.status(500).send("Error en el server");
        }

    }

    // Obtener todos los productos de la base de datos
    async listProducts(req, res) { 
        let limit = req.query.limit;       
        try {
            const products = await productsService.getProducts();
            if(limit){
                res.send(products.slice(0, limit));
            }else{
                res.send(products);
            }
        } catch (error) {
            res.status(500).send("Error al intentar listar los productos");
        }
    }    

    async getProductById(req, res) {
        let id = req.params.pid;
        try {
            const product = await productsService.getProductById(id);            
            res.send(product);
        } catch (error) {
            res.status(500).send("Error al cargar el producto con id: ", id);
        }
    }

    async updateProduct(req, res) {
        const id = req.params.pid;
        const nuevoProducto = req.body;  
        try {
            await productsService.updateProduct(id, nuevoProducto);
            res.status(200).send(`Producto con id: ${id}, editado correctamente`);             
        } catch (error) {
            res.status(500).send("Error al intentar editar el producto con id: ", id);
        }
    }

    async deleteProduct(req, res) { 
        const id = req.params.pid;       
        try {
            const deletedProduct = await productsService.deleteProduct(id); 
            res.status(201).send(`Producto con id: ${id}, borrado correctamente`);            
        } catch (error) {
            res.status(500).send("Error al intentar eliminar el producto con id: ", id);
        }
    }


}

export default ProductsController; 


