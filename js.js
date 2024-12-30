function toggleDetalles(producto){
    const detalles = producto.querySelector('.detalles');
    if(detalles !== null){
        detalles.style.display = detalles.style.display === 'block' ? 'none' : 'block';
    } else {
        console.log('No se encontraron los detalles del producto.');
    }
}

document.addEventListener('DOMContentLoaded', () =>{
    const botonDetalles = document.querySelectorAll('.btn-detalles');

    botonDetalles.forEach(boton => {
        boton.addEventListener('click', (event) => {
            const producto = event.target.closest('.card-producto');
            toggleDetalles(producto);
        });
    });
});





function carritoAgregar(producto) {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    let productoExiste = carrito.find(p => p.nombre === producto.nombre);

    if (productoExiste) {
        productoExiste.cantidad += 1;
    } else {
        carrito.push({
            nombre: producto.nombre,
            precio: producto.precio,
            cantidad: 1
        });
    }

    localStorage.setItem('carrito', JSON.stringify(carrito));

    actualizarCarrito();
}

function eliminarProducto(nombreProducto) {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    carrito = carrito.filter(producto => producto.nombre !== nombreProducto);

    localStorage.setItem('carrito', JSON.stringify(carrito));

    actualizarCarrito();
}


function eliminarCarrito() {
    localStorage.removeItem('carrito');
    actualizarCarrito();
}





document.addEventListener('DOMContentLoaded', () => {
  const isCheckoutPage = window.location.pathname.includes('checkout.html');

  if (isCheckoutPage) {

      let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
      const listaCarrito = document.getElementById('carritoLista');
      const cantidadTotal = document.getElementById('cantidadTotal');
      const precioTotal = document.getElementById('precioTotal');
      listaCarrito.innerHTML = ''; 

      let cantidad = 0;
      let costo = 0;

      carrito.forEach(producto => {
          cantidad += producto.cantidad;
          costo += producto.precio * producto.cantidad;

          let liElement = document.createElement('li');
          liElement.classList.add('list-group-item');
          liElement.textContent = `${producto.nombre} - $${producto.precio} x ${producto.cantidad}`;

          let btnEliminar = document.createElement('button');
          btnEliminar.textContent = 'Eliminar';
          btnEliminar.classList.add('btn', 'btn-danger', 'btn-sm');
          btnEliminar.onclick = () => eliminarProductoCheckout(producto.nombre);

          liElement.appendChild(btnEliminar);
          listaCarrito.appendChild(liElement);
      });

      cantidadTotal.textContent = cantidad;
      precioTotal.textContent = costo.toFixed(2);

      function eliminarProductoCheckout(nombreProducto) {
          let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
          carrito = carrito.filter(producto => producto.nombre !== nombreProducto);
          localStorage.setItem('carrito', JSON.stringify(carrito));
          actualizarCheckout(); 
      }

      function actualizarCheckout() {
          carrito = JSON.parse(localStorage.getItem('carrito')) || [];
          listaCarrito.innerHTML = '';
          cantidad = 0;
          costo = 0;

          carrito.forEach(producto => {
              cantidad += producto.cantidad;
              costo += producto.precio * producto.cantidad;

              let liElement = document.createElement('li');
              liElement.classList.add('list-group-item');
              liElement.textContent = `${producto.nombre} - $${producto.precio} x ${producto.cantidad}`;

              let btnEliminar = document.createElement('button');
              btnEliminar.textContent = 'Eliminar';
              btnEliminar.classList.add('btn', 'btn-danger', 'btn-sm');
              btnEliminar.onclick = () => eliminarProductoCheckout(producto.nombre);

              liElement.appendChild(btnEliminar);
              listaCarrito.appendChild(liElement);
          });

          cantidadTotal.textContent = cantidad;
          precioTotal.textContent = costo.toFixed(2);
      }

  } else {

      const botonCarrito = document.querySelectorAll('.btn-carrito');
      botonCarrito.forEach(boton => {
          boton.addEventListener('click', (event) => {
              const productoElemento = event.target.closest('.card-producto');
              const nombreProducto = productoElemento.querySelector('h3').textContent;
              const precioProducto = parseFloat(productoElemento.querySelector('p').textContent.replace('$', ''));

              const producto = {
                  nombre: nombreProducto,
                  precio: precioProducto
              };

              carritoAgregar(producto); 
          });
      });

      function carritoAgregar(producto) {
          let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

          let productoExiste = carrito.find(p => p.nombre === producto.nombre);
          if (productoExiste) {
              productoExiste.cantidad += 1;
          } else {
              carrito.push({
                  nombre: producto.nombre,
                  precio: producto.precio,
                  cantidad: 1
              });
          }

          localStorage.setItem('carrito', JSON.stringify(carrito));
          actualizarCarrito(); 
      }

      function actualizarCarrito() {
          let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
          const listaCarrito = document.getElementById('listaCarrito');
          const totalCantidad = document.getElementById('totalCantidad');
          const totalPrecio = document.getElementById('totalPrecio');

          const vaciarCarritoBtn = document.getElementById('vaciarCarrito');
          const contCompraBtn = document.getElementById('continuarCompra');

          if (vaciarCarritoBtn) {
            vaciarCarritoBtn.addEventListener('click', eliminarCarrito);
          }

          listaCarrito.innerHTML = '';

          let cantidad = 0;
          let costo = 0;

          carrito.forEach(producto => {
              cantidad += producto.cantidad;
              costo += producto.precio * producto.cantidad;

              let liElement = document.createElement('li');
              liElement.textContent = `${producto.nombre} - $${producto.precio} x ${producto.cantidad}`;

              let btnEliminar = document.createElement('button');
              btnEliminar.textContent = 'Eliminar';
              btnEliminar.onclick = () => eliminarProducto(producto.nombre);

              liElement.appendChild(btnEliminar);
              listaCarrito.appendChild(liElement);
          });

          totalCantidad.textContent = cantidad;
          totalPrecio.textContent = costo.toFixed(2);

          if (listaCarrito.innerHTML !== '') {
              vaciarCarritoBtn.style.display = 'block';
              contCompraBtn.style.display = 'block';
          } else {
              vaciarCarritoBtn.style.display = 'none';
              contCompraBtn.style.display = 'none';
          }
      }

      function eliminarProducto(nombreProducto) {
          let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
          carrito = carrito.filter(producto => producto.nombre !== nombreProducto);
          localStorage.setItem('carrito', JSON.stringify(carrito));
          actualizarCarrito();
      }

      function eliminarCarrito() {
          localStorage.removeItem('carrito');
          actualizarCarrito(); 
      }
  }
  actualizarCarrito();
});

function comprar(){
  alert("Gracias por tu compra!");
}



document.getElementById('cuestionario').addEventListener('submit', function(event) {
    event.preventDefault();

    const nombre = document.getElementById('nombre').value;
    const correo = document.getElementById('correo').value;
    const mensaje = document.getElementById('mensaje').value;

    if(nombre === '' || correo === '' || mensaje === ''){
        document.getElementById('mensaje-error').style.display = 'block';
    }else{
        document.getElementById('mensaje-error').style.display = 'none';
        alert('Formulario enviado correctamente');
    }
});