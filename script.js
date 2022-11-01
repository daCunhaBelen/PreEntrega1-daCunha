/* Compra en cuotas con y sin interes:
1 y 3 cuotas sin interes
6 cuotas con un interes del 15% 
12 cuotas con un interes del 30%
18 cuotas con un interes del 50%
*/
let total = parseInt(prompt("Ingrese monto a pagar"))
let cantidaddecuotas


do {
    cantidaddecuotas = parseInt(prompt("Ingrese cantidad de cuotas 1, 3, 6, 12 o 18"))

    if (cantidaddecuotas === 1) {
        alert("El total es: $ " + total)
    } else if (cantidaddecuotas === 1) {
        alert("El total es: $ " + total) 
    } else if (cantidaddecuotas === 6) {
        alert("El total es: $" + (total * 1.15))
    } else if (cantidaddecuotas === 12) {
        alert("El total es: $" + (total * 1.3))
    } else if (cantidaddecuotas === 18) {
        alert("El total es: $" + (total * 1.5))
    }
} while (cantidaddecuotas !=1 && cantidaddecuotas !=3 && cantidaddecuotas !=6 && cantidaddecuotas !=12 && cantidaddecuotas !=18);