// Variables generales
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

// Elemento del carrito flotante
const contadorCarrito = document.getElementById('contador-carrito');

// Actualizar contador en el carrito flotante
function actualizarContador() {
  if (contadorCarrito) {
    const totalItems = carrito.reduce((sum, item) => sum + item.cantidad, 0);
    contadorCarrito.textContent = totalItems;
  }
}

// Agregar al carrito desde botones en index.html y categoria.html
document.addEventListener('DOMContentLoaded', () => {
  // Actualizar el contador en el carrito flotante
  actualizarContador();

  const botones = document.querySelectorAll('.agregar-carrito');

  botones.forEach(boton => {
    boton.addEventListener('click', () => {
      const libro = boton.closest('.libro'); // Encontrar el contenedor más cercano
      const titulo = libro.querySelector('h2').textContent; // Obtener el título del libro
      const precioTexto = libro.querySelector('p:last-child').textContent.replace('$', ''); // Obtener el precio
      const precio = parseFloat(precioTexto);
      const imagen = libro.querySelector('img').getAttribute('src'); // Obtener la imagen del libro

      const producto = { titulo, precio, imagen, cantidad: 1 };

      // Verificar si el libro ya está en el carrito
      const indice = carrito.findIndex(p => p.titulo === producto.titulo);
      if (indice >= 0) {
        carrito[indice].cantidad++; // Aumentar la cantidad si el libro ya está en el carrito
      } else {
        carrito.push(producto); // Agregar un nuevo producto al carrito
      }

      localStorage.setItem('carrito', JSON.stringify(carrito)); // Guardar el carrito en LocalStorage
      actualizarContador(); // Actualizar el contador del carrito
    });
  });
});
