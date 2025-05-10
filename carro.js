document.addEventListener('DOMContentLoaded', () => {
  let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

  const contadorCarrito = document.getElementById('contador-carrito');

  function actualizarContador() {
    const totalItems = carrito.reduce((total, producto) => total + producto.cantidad, 0);
    if (contadorCarrito) {
      contadorCarrito.textContent = totalItems;
    }
  }

  actualizarContador();

  const botones = document.querySelectorAll('.agregar-carrito');

  botones.forEach(boton => {
    boton.addEventListener('click', () => {
      const libro = boton.closest('.libro');
      
      // Busca título con h3 o h2
      const tituloElemento = libro.querySelector('h3') || libro.querySelector('h2');
      const titulo = tituloElemento ? tituloElemento.textContent.trim() : 'Sin título';

      // Busca precio con clase o el último <p>
      const precioElemento = libro.querySelector('.precio') || libro.querySelector('p:last-of-type');
      const precioTexto = precioElemento.textContent.replace('$', '').trim();
      const precio = parseFloat(precioTexto);

      const imagen = libro.querySelector('img')?.getAttribute('src') || '';

      const productoExistente = carrito.find(p => p.titulo === titulo);

      if (productoExistente) {
        productoExistente.cantidad += 1;
      } else {
        carrito.push({ titulo, precio, imagen, cantidad: 1 });
      }

      localStorage.setItem('carrito', JSON.stringify(carrito));
      actualizarContador();
    });
  });
});
