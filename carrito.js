document.addEventListener('DOMContentLoaded', () => {
  let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

  const contenedor = document.getElementById('carrito-contenido');
  const totalTexto = document.getElementById('total');
  const formulario = document.getElementById('formulario-compra');
  const formCompra = document.getElementById('form-compra');

  function renderCarrito() {
    contenedor.innerHTML = '';
    if (carrito.length === 0) {
      contenedor.innerHTML = '<p>Tu carrito está vacío.</p>';
      formulario.style.display = 'none';
      totalTexto.textContent = 'Total: $0.00';
      return;
    }
    let total = 0;
    carrito.forEach((item, index) => {
      const div = document.createElement('div');
      div.className = 'item';
      div.innerHTML = `
        <img src="${item.imagen}" alt="${item.nombre}">
        <div class="item-info">
          <strong>${item.nombre}</strong><br>
          $${item.precio.toFixed(2)} x ${item.cantidad}
        </div>
        <button type="button" data-index="${index}" class="btn-eliminar">Eliminar</button>
      `;
      contenedor.appendChild(div);
      total += item.precio * item.cantidad;
    });
    totalTexto.textContent = `Total: $${total.toFixed(2)}`;
  }

  contenedor.addEventListener('click', e => {
    if (e.target.classList.contains('btn-eliminar')) {
      const index = Number(e.target.getAttribute('data-index'));
      carrito.splice(index, 1);
      localStorage.setItem('carrito', JSON.stringify(carrito));
      renderCarrito();
    }
  });

  window.vaciarCarrito = () => {
    if (confirm('¿Vaciar el carrito?')) {
      carrito = [];
      localStorage.setItem('carrito', JSON.stringify(carrito));
      renderCarrito();
    }
  };

  window.mostrarFormulario = () => {
    if (carrito.length === 0) {
      alert('Tu carrito está vacío.');
      return;
    }
    formulario.style.display = 'block';
    formulario.scrollIntoView({ behavior: 'smooth' });
  };

  // Validar inputs numéricos para tarjeta y CVV
  document.getElementById('numero').addEventListener('input', e => {
    e.target.value = e.target.value.replace(/\D/g, '').slice(0, 16);
  });
  document.getElementById('cvv').addEventListener('input', e => {
    e.target.value = e.target.value.replace(/\D/g, '').slice(0, 4);
  });

  formCompra.addEventListener('submit', e => {
    e.preventDefault();
    if (!formCompra.checkValidity()) {
      alert('Por favor, completa todos los campos correctamente.');
      return;
    }

    const nombre = formCompra.nombre.value.trim();
    const direccion = formCompra.direccion.value.trim();
    const tipoTarjeta = formCompra['tipo-tarjeta'].value;
    const total = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);

    // Guardamos comprobante en sessionStorage
    const comprobante = { nombre,
