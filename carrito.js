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
      formulario.style.display = 'none'; // Ocultar formulario si no hay items
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
      formulario.style.display = 'none'; // Ocultar formulario al re-renderizar
    }

    totalTexto.textContent = `Total: $${total.toFixed(2)}`;
  }

  // Delegación de evento para eliminar items
  contenedor.addEventListener('click', (e) => {
    if (e.target.classList.contains('btn-eliminar')) {
      const index = e.target.getAttribute('data-index');
      eliminarItem(Number(index));
    }
  });

  function eliminarItem(index) {
    carrito.splice(index, 1);
    localStorage.setItem('carrito', JSON.stringify(carrito));
    renderCarrito();
  }

  window.vaciarCarrito = () => {
    if (confirm('¿Vaciar el carrito?')) {
      carrito = [];
      localStorage.setItem('carrito', JSON.stringify(carrito));
      renderCarrito();
      formulario.style.display = 'none';
    }
  };

  window.mostrarFormulario = () => {
    if (carrito.length === 0) {
      alert('Tu carrito está vacío.');
    } else {
      formulario.style.display = 'block';
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    }
  };

  // Validar inputs numéricos en tiempo real
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

  // Manejo de envío del formulario
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

  renderCarrito();
});
