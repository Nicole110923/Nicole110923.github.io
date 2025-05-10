const botones = document.querySelectorAll('.agregar-carrito');
const carritoLista = document.getElementById('carrito-lista');
const totalTexto = document.getElementById('total');
let total = 0;

let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

function actualizarCarrito() {
  carritoLista.innerHTML = '';
  total = 0;

  carrito.forEach((item, index) => {
    const itemCarrito = document.createElement('li');
    itemCarrito.textContent = `${item.nombre} - $${item.precio} x${item.cantidad}`;

    const botonEliminar = document.createElement('boton-Eliminar');
    botonEliminar.textContent = 'Eliminar';
    botonEliminar.style.marginLeft = '10px';

    botonEliminar.addEventListener('click', () => {
      carrito.splice(index, 1);
      localStorage.setItem('carrito', JSON.stringify(carrito));
      actualizarCarrito();
    });

    itemCarrito.appendChild(botonEliminar);
    carritoLista.appendChild(itemCarrito);
    total += item.precio * item.cantidad;
  });

  totalTexto.textContent = `Total: $${total}`;
}

// Mostrar el carrito al cargar la página
actualizarCarrito();

botones.forEach(boton => {
  boton.addEventListener('click', () => {
    const nombre = boton.getAttribute('data-nombre');
    const precio = parseFloat(boton.getAttribute('data-precio'));

    const libroExistente = carrito.find(item => item.nombre === nombre);

    if (libroExistente) {
      libroExistente.cantidad++;
    } else {
      carrito.push({ nombre, precio, cantidad: 1 });
    }

    localStorage.setItem('carrito', JSON.stringify(carrito));
    actualizarCarrito();
  });
});

const botonPagar = document.getElementById('boton-pagar');
const formularioPago = document.getElementById('formulario-pago');
const formulario = document.getElementById('pago-form');

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
  const tarjeta = formulario.tarjeta.value;

  alert(`Gracias por tu compra, ${nombre}!\nTu pedido será enviado a:\n${direccion}\nNos comunicaremos al: ${telefono}`);

  carrito = [];
  localStorage.setItem('carrito', JSON.stringify(carrito));
  actualizarCarrito();
  formularioPago.style.display = 'none';
  formulario.reset();
});
// Inicializar carrito
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
actualizarContador();

// Escuchar clicks en los botones "Agregar al carrito"
document.addEventListener("DOMContentLoaded", () => {
  const botones = document.querySelectorAll("button");

  botones.forEach(boton => {
    boton.addEventListener("click", () => {
      const libro = boton.closest(".libro");
      const titulo = libro.querySelector("h3").textContent;
      const precio = libro.querySelector(".precio").textContent;
      const imagen = libro.querySelector("img").getAttribute("src");

      const producto = {
        titulo,
        precio,
        imagen,
        cantidad: 1,
      };

      // Si ya está en el carrito, aumentar cantidad
      const indice = carrito.findIndex(p => p.titulo === producto.titulo);
      if (indice >= 0) {
        carrito[indice].cantidad++;
      } else {
        carrito.push(producto);
      }

      // Guardar en localStorage
      localStorage.setItem("carrito", JSON.stringify(carrito));
      actualizarContador();
    });
  });
});

function actualizarContador() {
  const contador = carrito.reduce((total, producto) => total + producto.cantidad, 0);
  document.getElementById("contador-carrito").textContent = contador;
}

