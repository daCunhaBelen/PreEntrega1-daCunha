let contenedorCaja = document.createElement("div")
document.body.append(contenedorCaja)
contenedorCaja.setAttribute("class", "caja")

let encabezado = document.createElement("div")
contenedorCaja.append(encabezado)
encabezado.setAttribute("class", "encabezado")

let header = document.createElement("header")
encabezado.append(header)
header.innerHTML = '<h1 class="logo">One More Bite</h1>'

let menuUl = document.createElement("ul")
encabezado.append(menuUl)
menuUl.innerHTML = ` <li> <a class="bt-menu bt-inicio" href="./index.html">Continuar comprando</a></li>
<li> <a class="bt-menu bt-carrito active" href="./carrito.html">Carrito</a></li> `

