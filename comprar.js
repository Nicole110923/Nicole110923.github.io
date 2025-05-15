document.querySelectorAll('.boton-comprar-ahora').forEach(boton => {
  boton.addEventListener('click', () => {
    const nombre = boton.getAttribute('data-nombre');
    const precio = parseFloat(boton.getAttribute('data-precio'));

    const producto = { nombre, precio, cantidad: 1 };
    localStorage.setItem('productoCompraDirecta', JSON.stringify(producto));
    window.location.href = 'compra.html';
  });
});
