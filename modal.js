//ventana modal del carrito
const contenedorModal = document.getElementsByClassName('modal-contenedor')[0]
const botonAbrir = document.getElementById('boton-carrito')
const botonCerrar = document.getElementById('carritoCerrar')
const modalCarrito = document.getElementsByClassName('modal-carrito')[0]

// abrir carrito
botonAbrir.addEventListener('click', ()=>{
    contenedorModal.classList.toggle('modal-active')
})

//cerrar carrito
botonCerrar.addEventListener('click', ()=>{
    contenedorModal.classList.toggle('modal-active')
})

contenedorModal.addEventListener('click', (event) =>{
    contenedorModal.classList.toggle('modal-active')

})
modalCarrito.addEventListener('click', (event) => {
    event.stopPropagation() 
    //cuando clickeo sobre el modal se finaliza la propagacion del click a los elementos
    //padre
})