const productosContainer = document.getElementById('product1');
productosContainer.classList.add('productosContainer')
const productoEnCarrito = document.querySelectorAll('.productoEnCarrito')
const proContainer = document.getElementById('product');
proContainer.classList.add('pro-container')

const contenedorCarrito = document.getElementById('carrito-contenedor');
const botonIrAPagar = document.getElementById('Pagar');
const cantidad = document.getElementById('cantidad');
const precioTotal = document.getElementById('precioTotal');

let carrito = [];

fetch('./productos.json')
.then(response => response.json())
.then((data) =>{
    productos = data.productos
    CargarProductos(productos)
})

document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('carrito')){
        carrito = JSON.parse(localStorage.getItem('carrito'))
        actualizarCarrito()
    }
})

//mostrar productos
function CargarProductos(productos){
    productos.forEach((producto) => {
        const div = document.createElement('div');
        div.classList.add('pro')
        div.innerHTML = `
            <img src="${producto.img}" alt="">
            <div class="desc">
                <span>${producto.marca}</span>
                <h5>
                    ${producto.descripcion}
                </h5>
                <div class="star">
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                </div>
                <h4 class="precio">$${producto.precio}</h4>
                <button id="agregar${producto.id}" class="boton-agregar">
                    <i class="fa-solid fa-plus"></i>
                </button>
            </div>
        `
        proContainer.appendChild(div)
        // boton agregar
        const button = document.getElementById(`agregar${producto.id}`)
        button.addEventListener('click',()=>{
            agregarAlCarrito(producto.id);
            Toastify ({
                text: 'Se agregó el producto',
                duration: 2000,
                gravity: 'bottom',
                position: 'right',
                style: {
                    background: '#088178'
                }
            }).showToast();
        })
    });
}
//agregar al carrito
function agregarAlCarrito(prodId){
    const existe = carrito.some(prod => prod.id === prodId)
    if(existe){
        const prod = carrito.map((prod)=>{
            if(prod.id === prodId){
                prod.cantidad++
            }
        })
    }else{
        const item = productos.find((prod)=> prod.id === prodId)
        carrito.push(item)
    }
    actualizarCarrito()
}

//eliminar elementos del carrito
const eliminarDelCarrito = (prodId)=>{
    const item = carrito.find((prod)=>prod.id === prodId);
    const indice = carrito.indexOf(item);
    if(item){
        item.cantidad > 0 ? item.cantidad-- : carrito.splice(indice,1)
    }
    localStorage.removeItem('carrito');
    actualizarCarrito()
}


// Actualizar carrito
function actualizarCarrito(){
    contenedorCarrito.innerHTML = '';
    carrito.forEach((prod)=>{
        const div = document.createElement('div')
        div.className = ('productoEnCarrito');
        div.innerHTML = `
            <p>${prod.marca}</p>
            <p>${prod.descripcion}</p>
            <p>Precio:${prod.precio}</p>
            <p>Cantidad:<span id="cantidad">${prod.cantidad}</span></p>
            <button onclick="eliminarDelCarrito(${prod.id})" class="boton-eliminar">
                <i class="fas fa-trash-alt"></i>
            </button>
        `
        contenedorCarrito.appendChild(div);
        localStorage.setItem('carrito',JSON.stringify(carrito))
    })
    precioTotal.innerText = carrito.reduce((acc,prod)=> acc + prod.cantidad * prod.precio,0)
}


