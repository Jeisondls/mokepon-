const sectionReiniciar = document.getElementById('reiniciar')
const sectionSeleccionarAtaque = document.getElementById('seleccionar-ataque')
const botonMascotaJugador = document.getElementById('boton-mascota')
const botonReiniciar = document.getElementById('boton-reiniciar')

const sectionSeleccionarMascota = document.getElementById('seleccionar-mascota')

const spanMascotaJugador = document.getElementById('mascota-jugador')
const spanMascotaEnemigo = document.getElementById('mascota-enemigo')
const spanVidasJugador = document.getElementById('vidas-jugador')
const spanVidasEnemigo = document.getElementById('vidas-enemigo')
const sectionMensaje = document.getElementById('resultado')
const ataquesDelJugador = document.getElementById('ataques-del-jugador')
const ataquesDelEnemigo = document.getElementById('ataques-del-enemigo')
const contenedorTarjetas = document.getElementById('contenedorTarjetas')
const contenedorAtaques = document.getElementById('contenedorAtaques')

let mokepones = []
let ataqueJugador
let ataqueEnemigo
let opcionDeMokepon
let inputHipodoge 
let inputCapipepo 
let inputRatigueya 
let mascotaJugador
let ataquesMokepon
let botonFuego 
let botonAgua 
let botonTierra 
let vidasJugador = 3
let vidasEnemigo = 3

class Mokepon {
    constructor(nombre, foto, vida) {
        this.nombre = nombre
        this.foto = foto
        this.vida = vida
        this.ataques = []
    }
}

let hipodoge = new Mokepon('Hipodoge', 'img/Hipodoge.png', 5)

let capipepo = new Mokepon('Capipepo', 'img/Capipepo.png', 5)

let ratigueya = new Mokepon('Ratigueya', 'img/Ratigueya.png', 5)

hipodoge.ataques.push(
    { nombre: '🔥', id: 'boton-fuego' },
    { nombre: '🔥', id: 'boton-fuego' },
    { nombre: '🔥', id: 'boton-fuego' },
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '🌱', id: 'boton-tierra' },
)

capipepo.ataques.push(
    { nombre: '🌱', id: 'boton-tierra' },
    { nombre: '🌱', id: 'boton-tierra' },
    { nombre: '🌱', id: 'boton-tierra' },
    { nombre: '🔥', id: 'boton-fuego' },
    { nombre: '💧', id: 'boton-agua' },
)

ratigueya.ataques.push(
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '🌱', id: 'boton-tierra' },
    { nombre: '🔥', id: 'boton-fuego' },
)

mokepones.push(hipodoge,capipepo,ratigueya)


function iniciarJuego() {
    sectionReiniciar.style.display = 'none'  
    sectionSeleccionarAtaque.style.display = 'none'

    mokepones.forEach((mokepon) => {
        opcionDeMokepon = `
        <input type="radio" name="mascota" id=${mokepon.nombre} />
            <label class="tarjeta-de-mokepon" for=${mokepon.nombre}>
                <p>${mokepon.nombre}</p>
                <img class= "Hipo" src=${mokepon.foto} alt=${mokepon.nombre}>
            </label>
        `
        contenedorTarjetas.innerHTML += opcionDeMokepon
        
        inputHipodoge = document.getElementById('Hipodoge')
        inputCapipepo = document.getElementById('Capipepo')
        inputRatigueya = document.getElementById('Ratigueya')
    })

    botonMascotaJugador.addEventListener('click', seleccionarMascotaJugador)
    
    botonReiniciar.addEventListener('click', reiniciarJuego)
}

function seleccionarMascotaJugador() {
    sectionSeleccionarMascota.style.display = 'none'
    sectionSeleccionarAtaque.style.display = 'flex'

    if(inputHipodoge.checked) {
        spanMascotaJugador.innerHTML = inputHipodoge.id
        mascotaJugador = inputHipodoge.id
    } else if (inputCapipepo.checked) {
        spanMascotaJugador.innerHTML = inputCapipepo.id
        mascotaJugador = inputCapipepo.id
    } else if (inputRatigueya.checked) {
        spanMascotaJugador.innerHTML = inputRatigueya.id
        mascotaJugador = inputRatigueya.id
    } else {
        alert('Selecciona una mascota')
    }
    extraerAtaques(mascotaJugador)
    seleccionarMascotaEnemigo()
}

function extraerAtaques(mascotaJugador) {
    let ataques
    for (let i = 0; i < mokepones.length; i++) {
        if (mascotaJugador === mokepones[i].nombre) {
            ataques = mokepones[i].ataques
        }
        
    }
    
    mostrarAtaques(ataques)
}

function mostrarAtaques(ataques) {
    ataques.forEach((ataques) => {
        ataquesMokepon = `
         <button id=${ataques.id} class="boton-de-fuego">${ataques.nombre}</button>
        `
        contenedorAtaques.innerHTML += ataquesMokepon
    })

    botonFuego = document.getElementById('boton-fuego')
    botonAgua = document.getElementById('boton-agua')
    botonTierra = document.getElementById('boton-tierra')

    botonFuego.addEventListener('click', ataqueFuego)
    botonAgua.addEventListener('click', ataqueAgua)
    botonTierra.addEventListener('click', ataqueTierra)
}

function seleccionarMascotaEnemigo() {
    let mascotaAleatoria = aleatorio(0, mokepones.length -1)
    
    spanMascotaEnemigo.innerHTML = mokepones[mascotaAleatoria].nombre
}

function ataqueFuego() {
    ataqueJugador = 'Fuego'
    ataqueAleatorioEnemigo() 
}

function ataqueAgua() {
    ataqueJugador = 'Agua'
    ataqueAleatorioEnemigo()
}

function ataqueTierra() {
    ataqueJugador = 'Tierra'
    ataqueAleatorioEnemigo()
}

function ataqueAleatorioEnemigo() {
    let ataqueAleatorio = aleatorio(1, 3)
    
    if (ataqueAleatorio == 1) {
        ataqueEnemigo = 'Fuego'
    } else if (ataqueAleatorio == 2) {
        ataqueEnemigo = 'Agua'
    } else {
        ataqueEnemigo = 'Tierra'
    }
        combate()
}

function combate() {
    if (ataqueEnemigo == ataqueJugador) {
        crearMensaje('EMPATE')
    } else if (ataqueJugador == 'Fuego' && ataqueEnemigo == 'Tierra') {
        crearMensaje('Ganaste')
        vidasEnemigo--
        spanVidasEnemigo.innerHTML = vidasEnemigo
    } else if (ataqueJugador == 'Agua' && ataqueEnemigo == 'Fuego') {
        crearMensaje('Ganaste')
        vidasEnemigo--
        spanVidasEnemigo.innerHTML = vidasEnemigo
    } else if (ataqueJugador == 'Tierra' && ataqueEnemigo == 'Agua') {
        crearMensaje('Ganaste')
        vidasEnemigo--
        spanVidasEnemigo.innerHTML = vidasEnemigo
    } else {
        crearMensaje('Perdiste')
        vidasJugador--
        spanVidasJugador.innerHTML = vidasJugador
    }
    revisarVidas()
}

function revisarVidas() {
    if(vidasEnemigo == 0) {
        crearMensajeFinal('¡FELICITACIONES! Ganaste 🎉')
    } else if (vidasJugador == 0) {
        crearMensajeFinal('¡LO SIENTO! Perdiste 😢')
    }
}

function crearMensaje(resultado) {
    let nuevoAtaqueDelJugador = document.createElement('p')
    let nuevoAtaqueDelEnemigo = document.createElement('p')

    sectionMensaje.innerHTML = resultado
    nuevoAtaqueDelJugador.innerHTML = ataqueJugador
    nuevoAtaqueDelEnemigo.innerHTML = ataqueEnemigo

    ataquesDelJugador.appendChild(nuevoAtaqueDelJugador)
    ataquesDelEnemigo.appendChild(nuevoAtaqueDelEnemigo)  
}
function crearMensajeFinal(resultadoFinal) {
    sectionMensaje.innerHTML = resultadoFinal
    botonFuego.disabled = true 
    botonAgua.disabled = true
    botonTierra.disabled = true
    sectionReiniciar.style.display = 'block'  
}

function reiniciarJuego() {
    location.reload()
}

function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

window.addEventListener('load', iniciarJuego)