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
const sectionVerMapa = document.getElementById('ver-mapa')
const mapa = document.getElementById('mapa')

let mokepones = []
let ataqueJugador = [] 
let ataqueEnemigo = []
let opcionDeMokepon
let inputHipodoge 
let inputCapipepo 
let inputRatigueya 
let mascotaJugador
let mascotaJugadorObjeto
let ataquesMokepon
let ataquesMokeponEnemigo
let botonFuego 
let botonAgua 
let botonTierra 
let indexAtaqueJugador
let indexAtaqueEnemigo
let botones = []
let victoriasJugador = 0
let victoriasEnemigo = 0
let vidasJugador = 3
let vidasEnemigo = 3
let lienzo = mapa.getContext("2d")
let intervalo
let mapaBackground = new Image()
mapaBackground.src = 'img/mokemap.jpeg'
let alturaQueBuscamos
let anchoDelMapa = window.innerWidth - 20
const anchoMaximoDelMapa = 350
if (anchoDelMapa > anchoMaximoDelMapa) {
    anchoDelMapa = anchoMaximoDelMapa - 20
}

alturaQueBuscamos = anchoDelMapa * 600 / 800

mapa.width = anchoDelMapa
mapa.height = alturaQueBuscamos

class Mokepon {
    constructor(nombre, foto, vida, fotoMapa) {
        this.nombre = nombre
        this.foto = foto
        this.vida = vida
        this.ataques = []
        this.ancho = 80
        this.alto = 80
        this.x = aleatorio(0, mapa.width - this.ancho)
        this.y = aleatorio(0, mapa.height - this.alto)
        this.mapaFoto = new Image()
        this.mapaFoto.src = fotoMapa
        this.velocidadX = 0
        this.velocidadY = 0
    }

    pintarMokepon() {
        lienzo.drawImage(
            this.mapaFoto,
            this.x,
            this.y,
            this.ancho,
            this.alto
        )
    }
}

let hipodoge = new Mokepon('Hipodoge', 'img/Hipodoge.png', 5, "img/Hipodogehead.png")

let capipepo = new Mokepon('Capipepo', 'img/Capipepo.png', 5, "img/Capipepohead.png")

let ratigueya = new Mokepon('Ratigueya', 'img/Ratigueya.png', 5, "img/Ratigueyahead.png")

let hipodogeEnemigo = new Mokepon('Hipodoge', 'img/Hipodoge.png', 5, "img/Hipodogehead.png")

let capipepoEnemigo = new Mokepon('Capipepo', 'img/Capipepo.png', 5, "img/Capipepohead.png")

let ratigueyaEnemigo = new Mokepon('Ratigueya', 'img/Ratigueya.png', 5, "img/Ratigueyahead.png")
hipodoge.ataques.push(
    { nombre: '????', id: 'boton-fuego' },
    { nombre: '????', id: 'boton-fuego' },
    { nombre: '????', id: 'boton-fuego' },
    { nombre: '????', id: 'boton-agua' },
    { nombre: '????', id: 'boton-tierra' },
)

hipodogeEnemigo.ataques.push(
    { nombre: '????', id: 'boton-fuego' },
    { nombre: '????', id: 'boton-fuego' },
    { nombre: '????', id: 'boton-fuego' },
    { nombre: '????', id: 'boton-agua' },
    { nombre: '????', id: 'boton-tierra' },
)

capipepo.ataques.push(
    { nombre: '????', id: 'boton-tierra' },
    { nombre: '????', id: 'boton-tierra' },
    { nombre: '????', id: 'boton-tierra' },
    { nombre: '????', id: 'boton-fuego' },
    { nombre: '????', id: 'boton-agua' },
)

capipepoEnemigo.ataques.push(
    { nombre: '????', id: 'boton-tierra' },
    { nombre: '????', id: 'boton-tierra' },
    { nombre: '????', id: 'boton-tierra' },
    { nombre: '????', id: 'boton-fuego' },
    { nombre: '????', id: 'boton-agua' },
)

ratigueya.ataques.push(
    { nombre: '????', id: 'boton-agua' },
    { nombre: '????', id: 'boton-agua' },
    { nombre: '????', id: 'boton-agua' },
    { nombre: '????', id: 'boton-tierra' },
    { nombre: '????', id: 'boton-fuego' },
)

ratigueyaEnemigo.ataques.push(
    { nombre: '????', id: 'boton-agua' },
    { nombre: '????', id: 'boton-agua' },
    { nombre: '????', id: 'boton-agua' },
    { nombre: '????', id: 'boton-tierra' },
    { nombre: '????', id: 'boton-fuego' },
)

mokepones.push(hipodoge,capipepo,ratigueya)


function iniciarJuego() {
    sectionReiniciar.style.display = 'none'  
    sectionSeleccionarAtaque.style.display = 'none'
    sectionVerMapa.style.display = 'none'

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
    sectionVerMapa.style.display = 'flex'
    iniciarMapa()
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
         <button id=${ataques.id} class="boton-de-fuego BAtaque">${ataques.nombre}</button>
        `
        contenedorAtaques.innerHTML += ataquesMokepon
    })

    botonFuego = document.getElementById('boton-fuego')
    botonAgua = document.getElementById('boton-agua')
    botonTierra = document.getElementById('boton-tierra')
    botones = document.querySelectorAll('.BAtaque')

}

function secuenciaAtaque() {
    botones.forEach((botones) => {
        botones.addEventListener('click', (e) => {
            if (e.target.textContent === '????') {
                ataqueJugador.push('Fuego')
                console.log(ataqueJugador)
                botones.style.background = '#112f58'
                botones.disabled = true
            } else if (e.target.textContent === '????') {
                ataqueJugador.push('Agua')
                console.log(ataqueJugador)
                botones.style.background = '#112f58'
                botones.disabled = true
            } else {
                ataqueJugador.push('Tierra')
                console.log(ataqueJugador)
                botones.style.background = '#112f58'
                botones.disabled = true
            }
            ataqueAleatorioEnemigo()
        })
    })
}

function seleccionarMascotaEnemigo(enemigo) {    
    spanMascotaEnemigo.innerHTML = enemigo.nombre
    ataquesMokeponEnemigo = enemigo.ataques
    secuenciaAtaque()
}

function ataqueAleatorioEnemigo() {
    let ataqueAleatorio = aleatorio(0, ataquesMokeponEnemigo.length -1)
    
    if (ataqueAleatorio == 0 || ataqueAleatorio == 1) {
        ataqueEnemigo.push('Fuego') 
    } else if (ataqueAleatorio == 3 || ataqueAleatorio == 4) {
        ataqueEnemigo.push('Agua') 
    } else {
        ataqueEnemigo.push('Tierra')
    }
    console.log(ataqueEnemigo)
    iniciarPelea()
}

function iniciarPelea() {
    if (ataqueJugador.length === 5) {
        combate()
    }
}

function indexAmbosOponente(jugador, enemigo) {
    indexAtaqueJugador = ataqueJugador[jugador]
    indexAtaqueEnemigo = ataqueEnemigo[enemigo]
}

function combate() {

    for (let index = 0; index < ataqueJugador.length; index++) {
        if (ataqueJugador[index] === ataqueEnemigo[index]) {
            indexAmbosOponente(index, index)
            crearMensaje('EMPATE')
            spanVidasJugador.innerHTML = victoriasJugador
        } else if (ataqueJugador[index] === 'Fuego' && ataqueEnemigo[index] === 'Tierra') {
            indexAmbosOponente(index, index)
            crearMensaje("Ganaste")
            victoriasJugador++
            spanVidasJugador.innerHTML = victoriasJugador
        } else if (ataqueJugador[index] === 'Agua' && ataqueEnemigo[index] === 'Fuego') {
            indexAmbosOponente(index, index)
            crearMensaje("Ganaste")
            victoriasJugador++
            spanVidasJugador.innerHTML = victoriasJugador
        } else if (ataqueJugador[index] === 'Tierra' && ataqueEnemigo[index] === 'Agua') {
            indexAmbosOponente(index, index)
            crearMensaje("Ganaste")
            victoriasJugador++
            spanVidasJugador.innerHTML = victoriasJugador
        } else {
            indexAmbosOponente(index, index)
            crearMensaje("Perdiste")
            victoriasEnemigo++
            spanVidasEnemigo.innerHTML = victoriasEnemigo
        }
    }
    revisarVictorias()
}

function revisarVictorias() {
    if(victoriasJugador === victoriasEnemigo) {
        crearMensajeFinal('Esto Fue un empate!!!')
    } else if (victoriasJugador > victoriasEnemigo) {
        crearMensajeFinal('??FELICITACIONES! Ganaste????')
    } else {
        crearMensajeFinal("Lo siento, perdiste????")
    }
}

function crearMensaje(resultado) {
    let nuevoAtaqueDelJugador = document.createElement('p')
    let nuevoAtaqueDelEnemigo = document.createElement('p')

    sectionMensaje.innerHTML = resultado
    nuevoAtaqueDelJugador.innerHTML = indexAtaqueJugador
    nuevoAtaqueDelEnemigo.innerHTML = indexAtaqueEnemigo

    ataquesDelJugador.appendChild(nuevoAtaqueDelJugador)
    ataquesDelEnemigo.appendChild(nuevoAtaqueDelEnemigo)  
}
function crearMensajeFinal(resultadoFinal) {
    sectionMensaje.innerHTML = resultadoFinal

    sectionReiniciar.style.display = 'block'  
}

function reiniciarJuego() {
    location.reload()
}

function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function pintarCanvas() {

    mascotaJugadorObjeto.x = mascotaJugadorObjeto.x + mascotaJugadorObjeto.velocidadX
    mascotaJugadorObjeto.y = mascotaJugadorObjeto.y + mascotaJugadorObjeto.velocidadY
    lienzo.clearRect(0, 0, mapa.width, mapa.height)
    lienzo.drawImage(
        mapaBackground,
        0,
        0,
        mapa.width,
        mapa.height
    )
    mascotaJugadorObjeto.pintarMokepon()
    hipodogeEnemigo.pintarMokepon()
    capipepoEnemigo.pintarMokepon()
    ratigueyaEnemigo.pintarMokepon()

    if (mascotaJugadorObjeto.velocidadX !== 0 || mascotaJugadorObjeto.velocidadY !== 0) {
        revisarColision(hipodogeEnemigo)
        revisarColision(capipepoEnemigo)
        revisarColision(ratigueyaEnemigo)

    }
}

function moverDerecha() {
    mascotaJugadorObjeto.velocidadX = 5
}

function moverIzquierda() {
    mascotaJugadorObjeto.velocidadX = -5
}

function moverAbajo() {
    mascotaJugadorObjeto.velocidadY = 5
}

function moverArriba() {
    mascotaJugadorObjeto.velocidadY = -5
}

function detenerMovimiento() {

    mascotaJugadorObjeto.velocidadX = 0
    mascotaJugadorObjeto.velocidadY = 0
}

function sePresionoUnaTecla(event) {
    switch (event.key) {
        case 'ArrowUp':
            moverArriba()
            break
        case 'ArrowDown':
            moverAbajo()
            break
        case 'ArrowLeft':
            moverIzquierda()
            break
        case 'ArrowRight':
            moverDerecha()
            break
        default:
            break
    }
}

function iniciarMapa() {
    mapa.width = 640
    mapa.height = 480
    mascotaJugadorObjeto =obtenerObjetoMascota(mascotaJugador)

    intervalo = setInterval(pintarCanvas, 50)

    window.addEventListener('keydown', sePresionoUnaTecla)

    window.addEventListener('keyup', detenerMovimiento)
}

function obtenerObjetoMascota() {
    for (let i = 0; i < mokepones.length; i++) {
        if (mascotaJugador === mokepones[i].nombre) {
            return mokepones[i]
        }

    }
}

function revisarColision(enemigo) {
    const arribaEnemigo = enemigo.y
    const abajoEnemigo = enemigo.y + enemigo.alto
    const derechaEnemigo = enemigo.x + enemigo.ancho
    const izquierdaEnemigo = enemigo.x 

    const arribaMascota =
        mascotaJugadorObjeto.y
    const abajoMascota =
        mascotaJugadorObjeto.y + mascotaJugadorObjeto.alto
    const derechaMascota =
        mascotaJugadorObjeto.x + mascotaJugadorObjeto.ancho
    const izquierdaMascota =
        mascotaJugadorObjeto.x 

    if (
        abajoMascota < arribaEnemigo ||
        arribaMascota > abajoEnemigo ||
        derechaMascota < izquierdaEnemigo ||
        izquierdaMascota > derechaEnemigo
    ) {
        return
    }

    detenerMovimiento()
    clearInterval(intervalo)
    sectionSeleccionarAtaque.style.display = 'flex'
    sectionVerMapa.style.display = 'none'
    seleccionarMascotaEnemigo(enemigo)
    
}


window.addEventListener('load', iniciarJuego)