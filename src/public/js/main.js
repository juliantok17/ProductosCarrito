const socket = io();
console.log("Funciona correstamente main.js");

// Referencia al contenedor de productos
const productContainer = document.querySelector(".product-container-real");
const productForm = document.querySelector(".product-form");

// Recibimos el array de productos del servidor
socket.on("productos", (productos) => {
    renderProducts(productos);
});

// Función para renderizar productos en el contenedor
function renderProducts(productos) {
    productContainer.innerHTML = ""; // Limpiar el contenedor antes de agregar los productos

    productos.forEach((producto) => {
        const productCard = document.createElement("div");
        productCard.classList.add("product-card-real");

        productCard.innerHTML = `
            <h2 class="product-title-real">Producto: ${producto.title}</h2>
            <p class="product-description-real">Descripción: ${producto.description}</p>
            <p class="product-price-real">Precio: €${producto.price}</p>
            <button class="product-button-real" id="${producto._id}">Borrar</button>
        `;

        productContainer.appendChild(productCard);
    });
    // Vincular eventos a los botones "Borrar"
    const deleteButtons = document.querySelectorAll(".product-button-real");
    deleteButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const productCode = button.getAttribute("id");            
            socket.emit("deleteProduct", productCode); // Emitir evento para eliminar producto
        });
    });
}

// Manejar envío del formulario para agregar productos
productForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const newProduct = {
        title: document.getElementById("title").value,
        description: document.getElementById("description").value,
        price: parseFloat(document.getElementById("price").value),
        img: document.getElementById("img").value,
        code: document.getElementById("code").value,
        stock: parseInt(document.getElementById("stock").value),
    };

    socket.emit("newProduct", newProduct); // Emitir el nuevo producto al servidor

    productForm.reset(); // Limpiar el formulario después de enviarlo
});

