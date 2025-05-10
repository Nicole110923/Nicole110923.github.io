let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

const contadorCarrito = document.getElementById('contador-carrito');

function actualizarContador() {
  if (contadorCarrito) {
    const totalItems = carrito.reduce((sum, item) => sum + item.cantidad, 0);
    contadorCarrito.textContent = totalItems;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  actualizarContador();

  const botones = document.querySelectorAll('.agregar-carrito');

  botones.forEach(boton => {
    boton.addEventListener('click', () => {
      const libro = boton.closest('.libro');
      const titulo = libro.querySelector('h3').textContent;
      const precioTexto = libro.querySelector('p:last-child').textContent.replace('$', '');
      const precio = parseFloat(precioTexto);
      const imagen = libro.querySelector('img').getAttribute('src');

      const producto = { titulo, precio, imagen, cantidad: 1 };

      const indice = carrito.findIndex(p => p.titulo === producto.titulo);
      if (indice >= 0) {
        carrito[indice].cantidad++;
      } else {
        carrito.push(producto);
      }

      localStorage.setItem('carrito', JSON.stringify(carrito));
      actualizarContador();
    });
  });
});
