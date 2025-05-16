document.addEventListener('DOMContentLoaded', () => {
  let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
  const contenedor = document.getElementById('carrito-contenido');
  const totalTexto = document.getElementById('total');
  const formulario = document.getElementById('formulario-compra');

  function renderCarrito() {
    contenedor.innerHTML = '';
    let total = 0;

    if (carrito.length === 0) {
      contenedor.innerHTML = '<p>Tu carrito está vacío.</p>';
      // Oculta formulario solo si no hay productos
      if (formulario) formulario.style.display = 'none';
    } else {
      carrito.forEach((item, index) => {
        const div = document.createElement('div');
        div.className = 'item';
        div.innerHTML = `
          <img src="${item.imagen || 'https://via.placeholder.com/100'}" alt="${item.nombre}">
          <div class="item-info">
            <strong>${item.nombre}</strong><br>
            $${item.precio} x ${item.cantidad}
          </div>
          <button type="button" data-index="${index}" class="btn-eliminar">Eliminar</button>
        `;
        contenedor.appendChild(div);
        total += item.precio * item.cantidad;
      });
      // No ocultar el formulario aquí para no cerrarlo si ya está visible
    }

    totalTexto.textContent = `Total: $${total.toFixed(2)}`;
  }

  // Delegación de evento para eliminar items
  contenedor.addEventListener('click', (e) => {
    if (e.target.classList.contains('btn-eliminar')) {
      const index = Number(e.target.getAttribute('data-index'));
      eliminarItem(index);
    }
  });

  function eliminarItem(index) {
    if (index >= 0 && index < carrito.length) {
      carrito.splice(index, 1);
      localStorage.setItem('carrito', JSON.stringify(carrito));
      renderCarrito();
      if (carrito.length === 0 && formulario) formulario.style.display = 'none';
    }
  }

  window.vaciarCarrito = () => {
    if (confirm('¿Vaciar el carrito?')) {
      carrito = [];
      localStorage.setItem('carrito', JSON.stringify(carrito));
      renderCarrito();
      if (formulario) formulario.style.display = 'none';
    }
  };

  window.mostrarFormulario = () => {
    if (carrito.length === 0) {
      alert('Tu carrito está vacío.');
    } else if (formulario) {
      formulario.style.display = 'block';
      formulario.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Validación inputs numéricos
  const inputNumero = document.getElementById('numero');
  if (inputNumero) {
    inputNumero.addEventListener('input', e => {
      e.target.value = e.target.value.replace(/\D/g, '').slice(0, 16);
    });
  }
  const inputCVV = document.getElementById('cvv');
  if (inputCVV) {
    inputCVV.addEventListener('input', e => {
      e.target.value = e.target.value.replace(/\D/g, '').slice(0, 4);
    });
  }

  // Manejo envío formulario
  if (formulario) {
    formulario.addEventListener('submit', e => {
      e.preventDefault();

      if (!formulario.checkValidity()) {
        alert('Por favor, completa todos los campos correctamente.');
        return;
      }

      const nombre = formulario.nombre.value.trim();
      const direccion = formulario.direccion.value.trim();
      const tipoTarjeta = formulario['tipo-tarjeta'].value;
      const total = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);

      const comprobante = {
        nombre,
        direccion,
        tipoTarjeta,
        total: total.toFixed(2),
        carrito
      };

      sessionStorage.setItem('comprobante', JSON.stringify(comprobante));
      carrito = [];
      localStorage.removeItem('carrito');
      alert('¡Gracias por tu compra! Serás redirigido al comprobante.');
      window.location.href = 'comprobante.html';
    });
  }

  renderCarrito();
});
