document.addEventListener('DOMContentLoaded', function() {
    const productos = document.querySelectorAll('.ropa-info_container');
    productos.forEach(producto => {
        producto.addEventListener('click', function(event) {
            event.preventDefault();
            const nombreProducto = producto.querySelector('h3').textContent.trim();
            const precioElement = producto.querySelector('.ropa-precio');
            const precio = precioElement.firstChild.textContent.trim();
            console.log('Nombre del producto:', nombreProducto);
            console.log('Precio del producto:', precio);
        });
    });
}); 

    // FETCH PARA ENVIAR LOS DATOS AL SERVIDOR

    // function enviarDatosAlServidor(nombre, precio) {
    //     fetch('PONER url DEL SERVIDOR', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify({ nombreProducto: nombre, precioProducto: precio })
    //     })
    //     .then(response => {
    //         if (!response.ok) {
    //             throw new Error('Error al enviar los datos al servidor');
    //         }
    //         return response.json();
    //     })
    //     .then(data => {
    //         console.log('Datos enviados correctamente:', data);
    //     })
    //     .catch(error => {
    //         console.error('Error:', error.message);
    //     });
    // }

