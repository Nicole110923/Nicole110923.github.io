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

      // Obtener la imagen del producto
      const imagen = contenedor.querySelector('img') ? contenedor.querySelector('img').src : '';

      const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
      const productoExistente = carrito.find(item => item.nombre === nombre);
      
      if (productoExistente) {
        productoExistente.cantidad++;
      } else {
        // Agregar el nuevo producto con imagen
        carrito.push({
          nombre: nombre,
          precio: precio,
          cantidad: 1,
          imagen: imagen // Guardar la imagen
        });
      }

      localStorage.setItem('carrito', JSON.stringify(carrito));
      actualizarContador();
    });
  });

  actualizarContador();
});

// Actualizar el contador de productos en el carrito
function actualizarContador() {
  const contador = document.getElementById('contador-carrito');
  if (contador) {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const total = carrito.reduce((acc, item) => acc + item.cantidad, 0);
    contador.textContent = total;
  }
}
