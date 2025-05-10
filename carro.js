// Variables generales
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

// Elementos que pueden estar en distintas páginas
const carritoLista = document.getElementById('carrito-lista');
const totalTexto = document.getElementById('total');
const botonPagar = document.getElementById('boton-pagar');
const formularioPago = document.getElementById('formulario-pago');
const formulario = document.getElementById('pago-form');
const contadorCarrito = document.getElementById('contador-carrito');

// Actualizar contador en el carrito flotante
function actualizarContador() {
  if (contadorCarrito) {
    const totalItems = carrito.reduce((sum, item) => sum + item.cantidad, 0);
    contadorCarrito.textContent = totalItems;
  }
}

// Mostrar productos en carritodecompras.html
function actualizarCarrito() {
  if (!carritoLista || !totalTexto) return;

  carritoLista.innerHTML = '';
  let total = 0;

  carrito.forEach((item, index) => {
    const itemCarrito = document.createElement('li');
    itemCarrito.textContent = `${item.titulo} - $${item.precio} x${item.cantidad}`;

    const botonEliminar = document.createElement('button');
    botonEliminar.textContent = 'Eliminar';
    botonEliminar.style.marginLeft = '10px';
    botonEliminar.addEventListener('click', () => {
      carrito.splice(index, 1);
      localStorage.setItem('carrito', JSON.stringify(carrito));
      actualizarCarrito();
      actualizarContador();
    });

    itemCarrito.appendChild(botonEliminar);
    carritoLista.appendChild(itemCarrito);
    total += item.precio * item.cantidad;
  });

  totalTexto.textContent = `Total: $${total}`;
}

// Agregar al carrito desde botones en index.html y categoria.html
document.addEventListener('DOMContentLoaded', () => {
  actualizarContador();
  actualizarCarrito(); // Si estamos en carritodecompras.html

  const botones = document.querySelectorAll('.agregar-carrito');

  botones.forEach(boton => {
    boton.addEventListener('click', () => {
      const libro = boton.closest('.libro');
      const titulo = libro.querySelector('.info-libro h2').textContent; // Corregir acceso al nombre
      const precioTexto = libro.querySelector('.info-libro p:last-of-type').textContent.replace('$', '');
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

// Manejo del botón pagar
if (botonPagar && formularioPago && formulario) {
  botonPagar.addEventListener('click', () => {
    if (carritoLista.children.length === 0) {
      alert("Tu carrito está vacío.");
      return;
    }
    formularioPago.style.display = 'block';
  });

  formulario.addEventListener('submit', (e) => {
    e.preventDefault();
    const nombre = formulario.nombre.value;
    const direccion = formulario.direccion.value;
    const telefono = formulario.telefono.value;

    alert(`Gracias por tu compra, ${nombre}!\nTu pedido será enviado a:\n${direccion}\nNos comunicaremos al: ${telefono}`);

    carrito = [];
    localStorage.setItem('carrito', JSON.stringify(carrito));
    actualizarCarrito();
    actualizarContador();
    formularioPago.style.display = 'none';
    formulario.reset();
  });
}
