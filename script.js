const carrito = []

const pedidos = [
    { id: 0, titulo: "Combo Mundial", tipoDeComida: "Salada", precio: 2500 },
    { id: 1, titulo: "Pizza", tipoDeComida: "Salada", precio: 1200 },
    { id: 2, titulo: "Hambuerguesa + Papas Fritas", tipoDeComida: "Salada", precio: 1500 },
    { id: 3, titulo: "x2 Pintas", tipoDeComida: "Salada", precio: 450 },
    { id: 4, titulo: "Pastas", tipoDeComida: "Salada", precio: 1600 },
    { id: 5, titulo: "Sanguche de Milanesa", tipoDeComida: "Salada", precio: 1050 }]

let opciones = "Elegí la opcion que más te guste: "

for (const pedido of pedidos) {
    opciones = opciones + "\n" + "-" + pedido.id + "  " + pedido.titulo
}

let pedidoARealizar = prompt(opciones + "\n" + "Ingrese N° de la comida deseada:")
let filtro = pedidos.filter(pedido => pedido.id == (pedidoARealizar))

if (filtro.length <= 6) {
    let aMostrar = filtro.map(
        (aMostrar) => aMostrar.titulo + " " + "$" + aMostrar.precio + ". " + "Tipo de comida: " + aMostrar.tipoDeComida)
    alert("Estos son los pedidos realizados al momento")
    let conexion = aMostrar.join(", ")
    alert(conexion)
}
let agregar = ""
let condition = true

do {
    agregar = parseInt(prompt(`Desea agregar algun producto más al pedido? Ingrese el N° elegido:
    -0 Combo Mundial
    -1 Pizza
    -2 Hambuerguesa + Papas Fritas
    -3 x2 Pintas
    -4 Pastas
    -5 Sanguche de Milanesa
    -6 Finalizar Compra`))

    if (agregar < 6) {
        pedidoCompleto()
        console.log(agregar);
    } else {
        comprarCarrito()
        alert("Muchas gracias por su compra")
        condition = false
    }
} while (condition);

function pedidoCompleto() {
    agregar
    console.log(agregar);
    const busqueda = pedidos.find((el) => el.id == agregar)
    console.table(busqueda);
    if (busqueda) {
        carrito.push(busqueda);
        console.log(carrito);
        alert(busqueda.titulo + " " + "se agrego al carrito")
    }
    else {
        alert("opción no disponible")
    }
}

function comprarCarrito() {
    let total = carrito.reduce((acc, el) => acc + el.precio, 0)
    console.log(carrito);
    alert("El total es:" + " " + "$" + total.toString())
}