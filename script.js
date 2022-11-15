const pedidos = [
    { id: 0, titulo: "Combo Mundial", tipoDeComida: "Salada", precio: 2500 },
    { id: 1, titulo: "Pizza", tipoDeComida: "Salada", precio: 1200 },
    { id: 2, titulo: "Hambuerguesa", tipoDeComida: "Salada", precio: 1500 },
    { id: 3, titulo: "Papas Fritas", tipoDeComida: "Salada", precio: 550 },
    { id: 4, titulo: "Pastas", tipoDeComida: "Salada", precio: 1600 },
    { id: 5, titulo: "Milanesa", tipoDeComida: "Salada", precio: 1050 },
    { id: 6, titulo: "Falafel", tipoDeComida: "Salada", precio: 760 },
    { id: 7, titulo: "Helado", tipoDeComida: "Dulce", precio: 1250 },
    { id: 8, titulo: "Tarta de Frutilla", tipoDeComida: "Dulce", precio: 890 },
    { id: 9, titulo: "Cookies", tipoDeComida: "Dulce", precio: 500 },]

let opciones = "Elegí la opcion que más te guste: "

for(const pedido of pedidos) {
    opciones = opciones + "\n" + "-" + pedido.id + "  " + pedido.titulo }

let pedidoARealizar = prompt( opciones + "\n" + "Ingrese N° de la comida deseada:")
let filtro = pedidos.filter(pedido => pedido.id == (pedidoARealizar))

if (filtro.length <= 13) {
    let aMostrar = filtro.map(
        (aMostrar) => aMostrar.titulo + " " + "$" + aMostrar.precio + ". " + "Tipo de comida: " + aMostrar.tipoDeComida)
    alert("Estos son los pedidos realizados al momento")
    let conexion = aMostrar.join(", ")
    alert(conexion)
} else (alert("ERROR"))