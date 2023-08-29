/*BUSCADOR*/
let buscador = document.querySelector('#buscar');

buscador.addEventListener('change',e => {    
    if(e.target.matches('#buscar'))
        {document.querySelectorAll('.cardProducto').forEach(articulo => {
            articulo.textContent.toLowerCase().includes(e.target.value)
            ? articulo.classList.remove('filtro')
            : articulo.classList.add('filtro');
        })
        }
       
})

let carrito = JSON.parse(localStorage.getItem('carrito')) || []


/*CARDS ARTICULOS*/
//ASINCRONIA
const asincronia= ()=> {
    (async () => {

        const { value: email } = await Swal.fire({
          title: '¡Registrate y recibí  nuestras ofertas exclusivas!',
          input: 'email',
          inputLabel: 'Ingresa tu Email.',
          inputPlaceholder: 'email@ejemplo.com'
        })
        
        if (email) {
          Swal.fire(`¡Te registraste con exito! ${email}`)
        }
        
        })()
}
setTimeout(asincronia,1000)
// const productos = [
//     {imagen: "img/zapatilla1.jpg",nombre:"Zapatillas Nike Dunk Low Gs Naranja",precio:54500,id:1,cantidad:1,},
//     {imagen: "img/zapatilla2.jpg",nombre:"Zapatillas Nike Dunk Low Gs Celeste",precio:58000,id:2,cantidad:1,},
//     {imagen: "img/zapatilla3.jpg",nombre:"Zapatillas Nike Dunk Low Gs Azul",precio:57500,id:3,cantidad:1,},
//     {imagen: "img/zapatilla4.jpg",nombre:"Zapatillas Nike Dunk Low Gs Rosa",precio:54500,id:4,cantidad:1,},
//     {imagen: "img/zapatilla5.jpg",nombre:"Zapatillas Nike Dunk Low Gs Beige",precio:53800,id:5,cantidad:1,},
//     {imagen: "img/zapatilla6.jpg",nombre:"Zapatillas Adidas Forum 84 low Violeta",precio:71000,id:6,cantidad:1,},
//     {imagen: "img/zapatilla7.jpg",nombre:"Zapatillas Adidas Forum 84 low negras",precio:70000,id:7,cantidad:1,},
//     {imagen: "img/zapatilla8.jpg",nombre:"Zapatillas Adidas Forum 84 low lila",precio:71000,id:8,cantidad:1,},
//     {imagen: "img/zapatilla9.jpg",nombre:"Zapatillas Neu Balance 550 Gris",precio:54500,id:9,cantidad:1,},
//     {imagen: "img/zapatilla10.jpg",nombre:"Zapatillas New Balance 550 Azul",precio:55000,id:10,cantidad:1,},  
// ];
fetch("productos.json")
.then(respuesta => respuesta.json())
.then(data=> {
    const productos =data.productos
    productos.forEach((producto) =>{
        let contenidoPagina = document.createElement('div')
            contenidoPagina.className='cardProducto'
            contenidoPagina.innerHTML= `    
                <figure>
                    <img src="${producto.imagen}" alt="zapatilla">
                </figure>
                <div class="descripcionProducto">
                    <P class="nombreArticulo">${producto.nombre}</P>
                    <p class="precioArticulo">$${producto.precio}</p>    
                </div>    
            `    
        contenedorCards.append(contenidoPagina)
    /*CARRITO*/   
        let añadirCarrito = document.createElement('button')
            añadirCarrito.innerText='Añadir al carrito'
            añadirCarrito.className='añadirCarrito'
            contenidoPagina.append(añadirCarrito)
    
        añadirCarrito.addEventListener('click', ()=>{
            const repetido = carrito.some((repetidoProducto) => repetidoProducto.id === producto.id)
            if(repetido){
                carrito.map((prod)=>{
                    if(prod.id === producto.id){
                        prod.cantidad++
                    }
                })
            }else{
                carrito.push({
                    imagen:producto.imagen,
                    nombre:producto.nombre,
                    precio:producto.precio,
                    id:producto.id,
                    cantidad:producto.cantidad,            
                })
            }
            
            contador()  
            localSt()
            funcionCarrito()
        })
    })
})
const contenedorCards = document.querySelector('#contenedorCards')
const contenedorCardCarrito = document.querySelector('.nuevoProductoCarrito')
const carritoCompras = document.querySelector('.iconoCarrito')
const cantidadCarrito =document.querySelector('#cantidadCarrito')

// productos.forEach((producto) =>{
//     let contenidoPagina = document.createElement('div')
//         contenidoPagina.className='cardProducto'
//         contenidoPagina.innerHTML= `    
//             <figure>
//                 <img src="${producto.imagen}" alt="zapatilla">
//             </figure>
//             <div class="descripcionProducto">
//                 <P class="nombreArticulo">${producto.nombre}</P>
//                 <p class="precioArticulo">$${producto.precio}</p>    
//             </div>    
//         `    
//     contenedorCards.append(contenidoPagina)
// /*CARRITO*/   
//     let añadirCarrito = document.createElement('button')
//         añadirCarrito.innerText='Añadir al carrito'
//         añadirCarrito.className='añadirCarrito'
//         contenidoPagina.append(añadirCarrito)

//     añadirCarrito.addEventListener('click', ()=>{
//         const repetido = carrito.some((repetidoProducto) => repetidoProducto.id === producto.id)
//         if(repetido){
//             carrito.map((prod)=>{
//                 if(prod.id === producto.id){
//                     prod.cantidad++
//                 }
//             })
//         }else{
//             carrito.push({
//                 imagen:producto.imagen,
//                 nombre:producto.nombre,
//                 precio:producto.precio,
//                 id:producto.id,
//                 cantidad:producto.cantidad,            
//             })
//         }
        
//         contador()  
//         localSt()
//         funcionCarrito()
//     })
// })
const funcionCarrito=()=>{
    contenedorCardCarrito.innerHTML=''
    contenedorCardCarrito.style.display='flex'
    const headerCarrito =document.createElement('div')
        headerCarrito.className='headerCarrito'
        headerCarrito.innerHTML=`<p class="tituloCarrito">Mis compras:</p>`
    contenedorCardCarrito.append(headerCarrito)

    const cerrarCarrito = document.createElement('div')
        cerrarCarrito.className='iconoCerrar'
        cerrarCarrito.innerHTML=`<img src="img/Close.png" class="iconoCerrar" alt="iconoCerrar">`
    headerCarrito.append(cerrarCarrito)
    cerrarCarrito.addEventListener('click', ()=>{
        contenedorCardCarrito.style.display='none'
    })  
     
carrito.forEach((producto)=>{
    let infoProductoAñadido =document.createElement('div')
        infoProductoAñadido.className ='infoProductoAñadido';
        infoProductoAñadido.innerHTML= `
            <button class="restaArticulo">-</button>
            <p class="cantidadArticulo">${producto.cantidad}</p>
            <button class="sumaArticulo">+</button>
            <img class="imagenCarrito" src="${producto.imagen}" alt="zapatilla">
            <p class="articuloCarrito">${producto.nombre}</p>
            <p class="precioCarrito">$${producto.precio}</p>            
            <p class="totalArticulo">Total:${producto.cantidad * producto.precio}</p>
            <span class="iconoEliminar"><img src="img/Trash.png" alt="iconoEliminar"></span>
        `
    contenedorCardCarrito.append(infoProductoAñadido)

    let restaArticulo =infoProductoAñadido.querySelector('.restaArticulo')
     restaArticulo.addEventListener('click',()=>{
        if(producto.cantidad!==1){
            producto.cantidad --
        }
        localSt()
        funcionCarrito() 
    })

    let sumaArticulo =infoProductoAñadido.querySelector('.sumaArticulo')
    sumaArticulo.addEventListener('click',()=>{
        producto.cantidad ++
        localSt()
        funcionCarrito() 
       
    })

    let iconoEliminar = infoProductoAñadido.querySelector('.iconoEliminar')

    iconoEliminar.addEventListener('click',() =>{
        eliminarProducto(producto.id)
    })
})

const total = carrito.reduce((acumulador, el)=> acumulador + el.precio * el.cantidad,0)
const totalCarrito =document.createElement('div')
    totalCarrito.className='totalCarrito'
    totalCarrito.innerHTML=`Total a pagar: $${total}`
    contenedorCardCarrito.append(totalCarrito)

    let finalizarCompra = document.createElement('button')
    finalizarCompra.innerText= 'Finalizar compra'
    finalizarCompra.className='finalizarCompra'
    totalCarrito.append(finalizarCompra)
    
    

    if(total > 0){
        finalizarCompra = document.querySelector('.finalizarCompra')
        finalizarCompra.classList.remove('filtro')}        
        else{
            finalizarCompra.classList.add('filtro')
        }
        
        
        
    finalizarCompra.addEventListener('click', () => {
        let ventanacompra = window.open('http://127.0.0.1:3000/finalizarcompra.html','_blank');
        ventanacompra.focus();
                
    })
}



carritoCompras.addEventListener('click', funcionCarrito)

const eliminarProducto = (id)=>{
    const encontrarId = carrito.find((producto)=> producto.id === id)
    carrito= carrito.filter((carritoId) => {
        return carritoId !== encontrarId
    })
    contador()
    funcionCarrito()
    localSt()
    
}
const contador = () =>{
    cantidadCarrito.innerText = carrito.length

    const carritolegth = carrito.length

    localStorage.setItem('carritolegth', JSON.stringify(carritolegth))

    cantidadCarrito.innerText = JSON.parse(localStorage.getItem('carritolegth'))
}
contador()
/*LOCAL STORAGE*/
const localSt =()=>{
    localStorage.setItem('carrito', JSON.stringify(carrito))
}

JSON.parse(localStorage.getItem('carrito'))

const limpiarLocal = () =>{
    localStorage.clear()
}
const limpiarCarrito = () => {
    contenedorCardCarrito.innerHTML=" "
}



