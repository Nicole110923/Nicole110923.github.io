let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

const contadorCarrito = document.getElementById('contador-carrito');

function actualizarContador() {
  if (contadorCarrito) {
    let total = 0;
    carrito.forEach(item => {
      total += item.cantidad;
    });
    contadorCarrito.textContent = total;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  actualizarContador();

  const botones = document.querySelectorAll('.agregar-carrito');

  botones.forEach(boton => {
    boton.addEventListener('click', () => {
      const libro = boton.closest('.libro');
      const titulo = libro.querySelector('h3').textContent.trim();
      const precioTexto = libro.querySelector('p.precio').textContent.replace('$', '').trim();
      const precio = parseFloat(precioTexto);
      const imagen = libro.querySelector('img').getAttribute('src');

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
