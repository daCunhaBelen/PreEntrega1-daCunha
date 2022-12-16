let carritoCompra = JSON.parse(localStorage.getItem('carrito'))?.length > 0 ? JSON.parse(localStorage.getItem('carrito')) : []
JSON.parse(localStorage.getItem('carrito'))?.length > 0 ? JSON.parse(localStorage.getItem('carrito')) : localStorage.setItem('carrito', JSON.stringify(carritoCompra))

let filtrados = JSON.parse(localStorage.getItem('filtrado'))?.length > 0 ? JSON.parse(localStorage.getItem('filtrado')) : []
JSON.parse(localStorage.getItem('filtrado'))?.length > 0 ? JSON.parse(localStorage.getItem('filtrado')) : localStorage.setItem('filtrado', JSON.stringify(filtrados))

let paginaActual = localStorage.getItem('page')?.length > 0 ? localStorage.getItem('page') : 'home'
localStorage.getItem('page')?.length > 0 ? localStorage.getItem('page') : localStorage.setItem('page', (paginaActual))

let contenedorCaja = document.createElement("div")
document.body.append(contenedorCaja)
contenedorCaja.setAttribute("class", "caja")

let encabezado = document.createElement("div")
contenedorCaja.append(encabezado)
encabezado.setAttribute("class", "encabezado")

let header = document.createElement("header")
encabezado.append(header)
header.innerHTML = '<h1 class="logo">One More Bite</h1>'

let buscador = document.createElement("input")
buscador.setAttribute("class", "lupa")
buscador.setAttribute("id", "lupa")
buscador.setAttribute("name", "buscador")
buscador.setAttribute("placeholder", "Buscar producto")
encabezado.append(buscador)
buscador.addEventListener("input", funcionLupa)

let menuUl = document.createElement("ul")
encabezado.append(menuUl)
menuUl.innerHTML = ` 
<li><button id="TLP" class="bt-menu bt-categoria active" onclick=botonProductos()>Todos los productos</button></li>
<li><button id="Combos" class="bt-menu bt-categoria" onclick=filtradoCategorias("combos") >Combos</button></li>
<li><button id="Para Compartir" class="bt-menu bt-categoria" onclick=filtradoCategorias("p-compartir") >Para Compartir</button></li>
<li><button id="Pinto" class="bt-menu bt-categoria" onclick=filtradoCategorias("pinto") >Lo que Pintó</button></li>
<li><button id="Bebidas" class="bt-menu bt-categoria" onclick=filtradoCategorias("bebidas") >Bebidas</button></li>
<li> <button class="bt-menu bt-carrito" onclick=carritoCompras()>Carrito</button></li> `

let contenedorMain = document.createElement("main")
contenedorCaja.append(contenedorMain)

let listaProductos = document.createElement("ul")
listaProductos.setAttribute("class", "contenedorLista")
contenedorMain.append(listaProductos)

function agregarProductos(arrayProductos) {
    borrarTodo.remove()
    listaProductos.remove()
    listaProductos = document.createElement("ul")
    listaProductos.setAttribute("class", "contenedorLista")
    contenedorMain.append(listaProductos)
    for (const producto of arrayProductos) {
        let elementoLi = document.createElement("li")
        listaProductos.append(elementoLi)
        elementoLi.innerHTML = `<div class="product">
        <img class="img" src="${producto.img}" alt="${producto.titulo}">
        <div class="producto">
            <h3 class="titulo"> ${producto.titulo} </h3>
            <p class="precio"> $${producto.precio} </p>
            <button class="agregar" onclick= agregarAlCarrito(${producto.id})> Agregar al Carrito </button>
        </div>
    </div>
    `
    }
}

async function agregarAlCarrito(id) {
    let producto =await fetch(`https://mesquite-bramble-armadillo.glitch.me/products/${id}`)
    producto = await producto.json()
    let existe = carritoCompra.some(el => el.id === id)
    if (existe) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'El producto ya se encuentra en el carrito',
            footer: '<a href="">Why do I have this issue?</a>'
          })
    } else {
        carritoCompra.push(producto)
        localStorage.setItem('carrito', JSON.stringify(carritoCompra))
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Producto agregado correctamente',
            showConfirmButton: false,
            timer: 1500
          })
    }

}
let borrarTodo = document.createElement("button")
function carritoCompras() {
    if (borrarTodo) {
        borrarTodo.remove()
    }
    listaProductos.remove()
    listaProductos = document.createElement("ul")
    listaProductos.setAttribute("class", "carrito-contenedorLista")
    contenedorMain.append(listaProductos)
    for (const producto of carritoCompra) {
        let elementoLi = document.createElement("li")
        listaProductos.append(elementoLi)
        elementoLi.innerHTML = `<div class="carrito-product">
        <img class="carrito-img" src="${producto.img}" alt="${producto.titulo}">
        <div class="carrito-producto">
            <h3 class="carrito-titulo"> ${producto.titulo} </h3>
            <p class="carrito-precio"> $${producto.precio} </p>
            <button class="quitar" onclick= quitarDelCarrito(${producto.id})> Quitar del Carrito </button>
        </div>
    </div>
    `
    }
    localStorage.setItem('page', 'carrito')
    borrarTodo.innerText = 'Borrar Todo'
    borrarTodo.setAttribute('class', 'btn')
    borrarTodo.setAttribute('onclick', 'borrarCarrito()')
    contenedorMain.append(borrarTodo)
}

function borrarCarrito() {
    carritoCompra=[]
    localStorage.setItem('carrito', JSON.stringify(carritoCompra))
    carritoCompras()
}


function quitarDelCarrito(id) {
    carritoCompra = carritoCompra.filter(el => el.id != id)
    localStorage.setItem('carrito', JSON.stringify(carritoCompra))
    carritoCompras()
}

async function filtradoCategorias(categoria) {
    filtrados = await fetch(`https://mesquite-bramble-armadillo.glitch.me/category/${categoria}`)
    filtrados = await filtrados.json()
    localStorage.setItem('filtrado', JSON.stringify(filtrados))
    agregarProductos(filtrados)
    localStorage.setItem('page', 'filtrado')
}

async function funcionLupa() {
    let productos =await fetch('https://mesquite-bramble-armadillo.glitch.me/products')
    productos = await productos.json()
    productos = productos.filter(el => el.titulo.toLowerCase().includes(buscador.value))
    agregarProductos(productos)
}

async function botonProductos() {
    let productos =await fetch('https://mesquite-bramble-armadillo.glitch.me/products')
    productos = await productos.json()
    agregarProductos(productos)
    localStorage.setItem('page', 'home')
}

async function go() {
    let productos =await fetch('https://mesquite-bramble-armadillo.glitch.me/products')
    productos = await productos.json()
    console.log(productos);

    if (paginaActual == 'home') agregarProductos(productos)
    if (paginaActual == 'carrito') carritoCompras()
    if (paginaActual == 'filtrado') agregarProductos(filtrados)
}

go()