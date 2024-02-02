document.addEventListener('DOMContentLoaded', () => {
    // Seleccionar elementos del DOM
    const navCarrito = document.querySelector('.fa-cart-shopping');
    const carritoContainer = document.querySelector('.carrito-container');
    const productos = document.querySelectorAll('.ropa-info_container');
    const carritoContenido = document.querySelector('.carrito-contenido');
    const botonCompra = document.querySelector('.boton-comprar');
    const totalSpan = document.getElementById('total-precio');

    // Objeto para rastrear la cantidad y precio de cada producto en el carrito
    const productosEnCarrito = {};

    // Evento al hacer clic en el ícono del carrito
    navCarrito.addEventListener('click', event => {
        event.stopPropagation();
        carritoContainer.classList.toggle('visible-carrito');
    });

    // Evento al hacer clic en el contenido del carrito
    carritoContenido.addEventListener('click', event => {
        const target = event.target;

        // Verificar si se hizo clic en el botón de restar cantidad
        if (target.classList.contains('restar-cantidad')) {
            const nombreProducto = target.dataset.producto;
            restarCantidad(nombreProducto);
        }

        // Verificar si se hizo clic en el botón de eliminar producto
        if (target.classList.contains('eliminar-producto')) {
            const nombreProducto = target.dataset.producto;
            eliminarProducto(nombreProducto);
        }
    });

    // Elemento de mensaje de producto agregado
const mensajeProductoAgregado = document.getElementById('mensaje-producto-agregado');

// Función para mostrar el mensaje de producto agregado
function mostrarMensajeProductoAgregado(nombreProducto) {
    mensajeProductoAgregado.textContent = `${nombreProducto} ha sido agregado al carrito.`;
    mensajeProductoAgregado.style.display = 'block';

    // Ocultar el mensaje después de 3 segundos
    setTimeout(() => {
        mensajeProductoAgregado.style.display = 'none';
    }, 3000);
}

    // Evento al hacer clic en los productos disponibles
    productos.forEach(producto => {
        producto.addEventListener('click', event => {
            event.preventDefault();

            const nombreProducto = producto.querySelector('h3').textContent.trim();
            const precioElement = producto.querySelector('.ropa-precio');
            const precioText = precioElement.textContent.trim();
            const precios = precioText.match(/[\d.,]+/g);
            const precio = parseFloat(precios[0].replace(',', '.'));

            // Verificar si el clic se hizo en el elemento .carro
            if (event.target.classList.contains('carro')) {
                // Verificar si el producto ya está en el carrito
                if (productosEnCarrito[nombreProducto]) {
                    // Incrementar la cantidad si ya está en el carrito
                    productosEnCarrito[nombreProducto].cantidad += 1;
                    // Actualizar la visualización de la cantidad
                    productosEnCarrito[nombreProducto].elemento.querySelector('.cantidad').textContent = `Cantidad: ${productosEnCarrito[nombreProducto].cantidad}`;
                } else {
                    // Crear un nuevo elemento para el producto en el carrito
                    const productoEnCarrito = document.createElement('div');
                    productoEnCarrito.classList.add('producto-en-carrito');

                    // Inicializar la cantidad y precio
                    productosEnCarrito[nombreProducto] = {
                        cantidad: 1,
                        precio: precio,
                        elemento: productoEnCarrito
                    };

                    // Obtener la URL de la imagen del producto
                    const imagenProducto = producto.querySelector('.ropa-img img').src;

                    // Agregar el nuevo elemento al carrito
                    productoEnCarrito.innerHTML = `
                        <div class="carrito-previa">
                            <img src="${imagenProducto}" alt="${nombreProducto}">
                        </div>
                        <p>
                            <strong>${nombreProducto}</strong> - Precio: $<span class="precio">${precio.toFixed(2)}</span>
                            <span class="cantidad">Cantidad: ${productosEnCarrito[nombreProducto].cantidad}</span>
                            <button class="restar-cantidad" data-producto="${nombreProducto}">-</button>
                            <button class="eliminar-producto" data-producto="${nombreProducto}">Eliminar</button>
                        </p>`;

                    carritoContenido.appendChild(productoEnCarrito);
                }

                calcularTotal();
            }
        });
    });

    // Función para calcular el total y actualizar la visualización
    function calcularTotal() {
        let total = 0;
        for (const producto in productosEnCarrito) {
            total += productosEnCarrito[producto].cantidad * productosEnCarrito[producto].precio;
        }
        // Actualizar el contenido del span de total
        totalSpan.textContent = total.toFixed(2);
    }

    // Función para restar la cantidad de un producto en el carrito
    function restarCantidad(nombreProducto) {
        if (productosEnCarrito[nombreProducto] && productosEnCarrito[nombreProducto].cantidad > 0) {
            productosEnCarrito[nombreProducto].cantidad -= 1;
            productosEnCarrito[nombreProducto].elemento.querySelector('.cantidad').textContent = `Cantidad: ${productosEnCarrito[nombreProducto].cantidad}`;
            calcularTotal();

            // Verificar si la cantidad llega a cero y eliminar el elemento del carrito
            if (productosEnCarrito[nombreProducto].cantidad === 0) {
                carritoContenido.removeChild(productosEnCarrito[nombreProducto].elemento);
                delete productosEnCarrito[nombreProducto];
            }
        }
    }

    // Función para eliminar un producto del carrito
    function eliminarProducto(nombreProducto) {
        if (productosEnCarrito[nombreProducto]) {
            carritoContenido.removeChild(productosEnCarrito[nombreProducto].elemento);
            delete productosEnCarrito[nombreProducto];
            calcularTotal();
        }
    }
});