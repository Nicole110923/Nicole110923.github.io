document.addEventListener('DOMContentLoaded', () => {
  const botones = document.querySelectorAll('.agregar-carrito');
  botones.forEach(btn => {
    btn.addEventListener('click', () => {
      const contenedor = btn.closest('.libro') || btn.parentElement;
      let nombre = btn.dataset.nombre;
      if (!nombre && contenedor) {
        const titleElem = contenedor.querySelector('h3') || contenedor.querySelector('h2');
        nombre = titleElem ? titleElem.textContent : '';
      }
      let precioText = btn.dataset.precio || '';
      if (!precioText && contenedor) {
        const precioElem = contenedor.querySelector('p.precio');
        if (precioElem) {
          precioText = precioElem.textContent;
        } else {
          const ps = contenedor.querySelectorAll('p');
          if (ps.length) {
            precioText = ps[ps.length - 1].textContent;
          }
        }
      }
      const precio = parseFloat(precioText.replace(/[^0-9.,]/g, '').replace(',', '.'));
      const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
      const productoExistente = carrito.find(item => item.nombre === nombre);
      if (productoExistente) {
        productoExistente.cantidad++;
      } else {
        carrito.push({ nombre: nombre, precio: precio, cantidad: 1 });
      }
      localStorage.setItem('carrito', JSON.stringify(carrito));
      actualizarContador();
    });
  });
  actualizarContador();
});

function actualizarContador() {
  const contador = document.getElementById('contador-carrito');
  if (contador) {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const total = carrito.reduce((acc, item) => acc + item.cantidad, 0);
    contador.textContent = total;
  }
}
