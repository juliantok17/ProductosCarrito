console.log("Funciona correstamente main.js");

document.addEventListener("DOMContentLoaded", () => {
    const buttons = document.querySelectorAll(".product-button-real");

    buttons.forEach(button => {
        button.addEventListener("click", async () => {
            const cartId = button.getAttribute("cart-id");
            const productId = button.getAttribute("product-id");            

            try {
                // Llamada al endpoint
                const response = await fetch(`/api/cars/${cartId}/products/${productId}`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    }
                });

                if (response.ok) {
                    const result = await response.json();
                    alert(`Producto agregado correctamente: ${result.message}`);
                } else {
                    const error = await response.json();
                    alert(`Error al agregar producto: ${error.message}`);
                }
            } catch (error) {
                console.error("Error al agregar producto al carrito:", error);
                alert("Error en la conexión con el servidor.");
            }
        });
    });
});