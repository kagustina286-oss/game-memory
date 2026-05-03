let cartasDestapadas = 0
let temporizador = false
let pares = 0
let timerInicial = 40
let timer = 40
let puntaje = 0
let movimientos = 0
let mostrarTiempo = document.getElementById('t-restante')
let mostrarMovimientos = document.getElementById('movimientos')
let mostrarAciertos = document.getElementById('aciertos')

let numeros = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8]
numeros = numeros.sort(() => Math.random() - 0.5)

let primeraEleccion, segundaEleccion, primerId, segundoId, tiempoRegresivo

function contarTiempo() {
    tiempoRegresivo = setInterval(() => {
        mostrarTiempo.innerHTML = `Tiempo: ${timer} segundos`
        timer--
        if (timer < 0) {
            clearInterval(tiempoRegresivo)
            bloquearTarjetas()
        }
    }, 1000)
}

function bloquearTarjetas() {
    for (let i = 0; i <= 15; i++) {
        let tarjeta = document.getElementById(String(i))
        tarjeta.innerHTML = `<img src="./images/img.${numeros[i]}.png" alt="">`
        tarjeta.disabled = true
    }
}

function girar(id) {
    if (temporizador == false) {
        contarTiempo()
        temporizador = true
    }

    if (cartasDestapadas == 0) {
        let card1 = document.getElementById(String(id))
        primeraEleccion = numeros[id]
        card1.innerHTML = `<img src="./images/img.${primeraEleccion}.png" alt="">`
        card1.disabled = true
        cartasDestapadas++
        primerId = id

    } else if (cartasDestapadas == 1) {
        let card2 = document.getElementById(String(id))
        segundaEleccion = numeros[id]
        card2.innerHTML = `<img src="./images/img.${segundaEleccion}.png" alt="">`
        card2.disabled = true
        cartasDestapadas++
        segundoId = id

        movimientos++
        mostrarMovimientos.innerHTML = `Movimientos: ${movimientos}`

        if (primeraEleccion == segundaEleccion) {
            cartasDestapadas = 0
            pares++
            mostrarAciertos.innerHTML = `Aciertos: ${pares}`

            if (pares == 8) {
                clearInterval(tiempoRegresivo)
                mostrarTiempo.innerHTML = `¡Ganaste en ${timerInicial - timer - 1} segundos!`
            }

        } else {
            setTimeout(() => {
                let card1 = document.getElementById(String(primerId))
                let card2 = document.getElementById(String(segundoId))
                card1.innerHTML = ''
                card2.innerHTML = ''
                card1.disabled = false
                card2.disabled = false
                cartasDestapadas = 0
            }, 500)
        }
    }
}