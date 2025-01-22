class ProductDTO {
    constructor(product) {  
        this.title = product.title;   
        this.descripcion = product.descripcion;
        this.price = product.price; 
        this.img = product.img; 
        this.code = product.code; 
        this.stock = product.stock;           
    }

}

export default ProductDTO; 