const productos = [
    { id: 0, categoria: "Combos", titulo: "Combo Mundial", stock: 100, precio: 3500, img: "./img/combo.png" },
    { id: 1, categoria: "Pinto", titulo: "Pizza", stock: 40, precio: 1200, img: "./img/pizza.png" },
    { id: 2, categoria: "Pinto", titulo: "Hamburguesa", stock: 60, precio: 2100, img: "./img/hamburguesa.png" },
    { id: 3, categoria: "Bebidas", titulo: "x2 Pintas", stock: 202, precio: 700, img: "./img/pinta.png" },
    { id: 4, categoria: "P-Compartir", titulo: "Pastas", stock: 37, precio: 1500, img: "./img/pastas.png" },
    { id: 5, categoria: "P-Compartir", titulo: "Rabas", stock: 45, precio: 820, img: "./img/rabas.png" },
    { id: 6, categoria: "Pinto", titulo: "Lomo con papas", stock: 26, precio: 2900, img: "./img/lomo.png" },
    { id: 7, categoria: "Pinto", titulo: "Falafel", stock: 15, precio: 900, img: "./img/falafel.png" }]

let carritoCompra = JSON.parse(localStorage.getItem('carrito'))?.length > 0 ? JSON.parse(localStorage.getItem('carrito')): []
JSON.parse(localStorage.getItem('carrito'))?.length > 0 ? JSON.parse(localStorage.getItem('carrito')): localStorage.setItem('carrito', JSON.stringify(carritoCompra))

let filtrados = JSON.parse(localStorage.getItem('filtrado'))?.length > 0 ? JSON.parse(localStorage.getItem('filtrado')): []
JSON.parse(localStorage.getItem('filtrado'))?.length > 0 ? JSON.parse(localStorage.getItem('filtrado')): localStorage.setItem('filtrado', JSON.stringify(filtrados))


let paginaActual = localStorage.getItem('page')?.length > 0 ? localStorage.getItem('page'): 'home'
localStorage.getItem('page')?.length > 0 ? localStorage.getItem('page'): localStorage.setItem('page', (paginaActual))

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
<li><button id="Combos" class="bt-menu bt-categoria" onclick=filtradoCategorias("Combos") >Combos</button></li>
<li><button id="Para Compartir" class="bt-menu bt-categoria" onclick=filtradoCategorias("P-Compartir") >Para Compartir</button></li>
<li><button id="Pinto" class="bt-menu bt-categoria" onclick=filtradoCategorias("Pinto") >Lo que Pintó</button></li>
<li><button id="Bebidas" class="bt-menu bt-categoria" onclick=filtradoCategorias("Bebidas") >Bebidas</button></li>
<li> <button class="bt-menu bt-carrito" onclick=carritoCompras()>Carrito</button></li> `

let contenedorMain = document.createElement("main")
contenedorCaja.append(contenedorMain)

let listaProductos = document.createElement("ul")
listaProductos.setAttribute("class", "contenedorLista")
contenedorMain.append(listaProductos)

function agregarProductos(arrayProductos) {
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

function agregarAlCarrito(id) {
    let existe = carritoCompra.some(el => el.id === id)
    if (existe) {
       return alert("El producto ya se encuentra en el carrito")
    }else {
        let guardado = productos.find(el => el.id == id)
        carritoCompra.push(guardado)
        localStorage.setItem('carrito', JSON.stringify(carritoCompra))
    }
    
}

function carritoCompras() {
    listaProductos.remove()
    listaProductos = document.createElement("ul")
    listaProductos.setAttribute("class", "contenedorLista")
    contenedorMain.append(listaProductos)
    for (const producto of carritoCompra) {
        let elementoLi = document.createElement("li")
        listaProductos.append(elementoLi)
        elementoLi.innerHTML = `<div class="product">
        <img class="img" src="${producto.img}" alt="${producto.titulo}">
        <div class="producto">
            <h3 class="titulo"> ${producto.titulo} </h3>
            <p class="precio"> $${producto.precio} </p>
            <button class="quitar" onclick= quitarDelCarrito(${producto.id})> Quitar del Carrito </button>
        </div>
    </div>
    `
    }
    localStorage.setItem('page', 'carrito')
}

function quitarDelCarrito(id) {
    carritoCompra = carritoCompra.filter(el => el.id != id)
    localStorage.setItem('carrito', JSON.stringify(carritoCompra))
    carritoCompras()
}

function filtradoCategorias(categoria) {
    filtrados = productos.filter(el => el.categoria == categoria)
    localStorage.setItem('filtrado', JSON.stringify(filtrados))
    agregarProductos(filtrados)
    localStorage.setItem('page', 'filtrado')
}

function funcionLupa() {
    let x = productos.filter(el => el.titulo.toLowerCase().includes(buscador.value))
    agregarProductos(x)
}

function botonProductos() {
    agregarProductos(productos)
    localStorage.setItem('page', 'home')
}

if (paginaActual == 'home') agregarProductos(productos)
if (paginaActual == 'carrito') carritoCompras()
if (paginaActual == 'filtrado') agregarProductos(filtrados)