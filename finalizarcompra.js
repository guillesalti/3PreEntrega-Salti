///////////////////////////////////////DATOS FACTURACION
const finalizarCompraCont = document.querySelector('#finalizarCompraCont')

const comprarCarrito = document.querySelector('.comprarCarrito')

let carrito = JSON.parse(localStorage.getItem('carrito'))
console.log(carrito)

carrito.forEach((producto)=>{
    let infoProductoAñadido =document.createElement('div')
        infoProductoAñadido.className ='infoProductoAñadido';
        infoProductoAñadido.innerHTML= `
            <p class="cantidadArticulo">${producto.cantidad}</p>
            <img class="imagenCarrito" src="${producto.imagen}" alt="zapatilla">
            <p class="articuloCarrito">${producto.nombre}</p>
            <p class="precioCarrito">$${producto.precio}</p>            
            <p class="totalArticulo">Total:${producto.cantidad * producto.precio}</p>
        `
        comprarCarrito.append(infoProductoAñadido)
})
const total = carrito.reduce((acumulador, el)=> acumulador + el.precio * el.cantidad,0)
const totalCarrito =document.createElement('div')
    totalCarrito.className='totalCarrito'
    totalCarrito.innerHTML=`Total a pagar: $${total}`
    comprarCarrito.append(totalCarrito)

    const confirmarPago = document.getElementById('confirmarPago')

    confirmarPago.addEventListener('click', ()=>{
      Swal.fire(
        'Compra realizada con éxito',
        'Gracias por confiar en nosotros',
        'success'
      )
      const botonOk = document.querySelector('.swal2-confirm')
          botonOk.addEventListener('click', ()=>{
            botonOk=window.close()
          })
    })

