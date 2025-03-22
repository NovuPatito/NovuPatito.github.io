const casa = document.getElementById('casa');
const preguntaElemento = document.getElementById('pregunta');
const respuestasElemento = document.getElementById('respuestas');
const tiempoElemento = document.getElementById('tiempo');
const puntosElemento = document.getElementById('puntos');
const mensajeDerrumbado = document.getElementById('mensaje-derrumbado');
const mensajeGanaste = document.getElementById('mensaje-ganaste');
const mensajeEquivocado = document.getElementById('mensaje-equi');

let puntuacion = 0;
let tiempoRestante = 300
let respuestaIncorrecta = false;
let preguntas = [
    {
        pregunta: '¿Cuáles son los 2 sacramentos de la Iglesia Pentecostal de Chile?',
        respuestas: ['A) El Bautismo y Santa Cena', 'B) El Ungimiento y el Bautismo', 'C) El Matrimonio y la Confirmación'],
        respuestaCorrecta: 0
    },
    {
        pregunta: 'La Iglesia Pentecostal de Chile cree en',
        respuestas: ['A) La Trinidad de Dios, Bautismo del Espíritu Santo y que todos somos salvos', 'B) Cree en el Espíritu Santo, en la Iglesia universal y en la segunda venida de Cristo', 'C) La reencarnación y el karma.'],
        respuestaCorrecta: 1
    },
    {
        pregunta: '¿Qué promesa da Jesús en Juan 5:24 a los que oyen su palabra y creen?',
        respuestas: ['A) Serán ricos y famosos', 'B) Nunca tendrán problemas ni dificultades', 'C) Tendrán vida eterna y no vendrán a condenación'],
        respuestaCorrecta: 2
    },
    {
        pregunta: 'Las cinco solas son',
        respuestas: ['A) Solo los sacramentos, solo los santos, solo las reliquias', 'B) Solo Escritura, solo Cristo, solo Fe, solo Gracia y solo Gloria a Dios', 'C) Solo Escritura, solo Cristo, solo oración'],
        respuestaCorrecta: 1
    },
    {
        pregunta: 'Algunos frutos del Espíritu Santo son',
        respuestas: ['A) Amor, bondad, sabiduría, benignidad, ciencia', 'B) Mansedumbre, templanza, gozo, paz, paciencia', 'C) Riqueza, poder, fama, éxito, salud'],
        respuestaCorrecta: 1
    },
    {
        pregunta: '¿Qué representa la roca en la parábola del hombre prudente?',
        respuestas: ['A) El poder político', 'B) La riqueza material', 'C) Jesús y su enseñanza'],
        respuestaCorrecta: 2
    },
    {
        pregunta: 'Profetas del Antiguo Testamento',
        respuestas: ['A) Isaías, Jeremías, Daniel, Natan', 'B) Isaías, Jeremías, Daniel, Josue', 'C) Pedro, Sócrates, Aristóteles, Juan'],
        respuestaCorrecta: 0
    },
    {
        pregunta: '¿Qué bendición reciben los que oyen la Palabra de Dios y la obedecen? (Lucas 11:28)',
        respuestas: ['A) Serán llamados hijos de Dios', 'B) Serán bienaventurados', 'C) Tendrán inmunidad ante la ley'],
        respuestaCorrecta: 1
    },
    {
        pregunta: 'En Apocalipsis 3:20, Jesús dice que está a la puerta y llama. ¿Qué pasa si alguien oye su voz y abre la puerta?',
        respuestas: ['A) Recibirá un premio en el cielo', 'B) Se convertirá en un ángel', 'C) Jesús entrará y cenará con él'],
        respuestaCorrecta: 2
    },
    {
        pregunta: '¿Por qué es importante no solo oír, sino también obedecer la Palabra de Dios?',
        respuestas: ['A) Para mostrarle a otros que somos cristianos', 'B) Para construir una vida firme y estable en Cristo', 'C) Para obtener poder y control sobre los demás'],
        respuestaCorrecta: 1
    }
];

function actualizarTiempoVisual(tiempoactual) {
    tiempoElemento.textContent = `Tiempo restante: ${tiempoactual} segundos`;
}

function reproducirSonidoGanar() {
    document.getElementById('sonidoGanar').play();
  }
  
  function reproducirSonidoEquivocado() {
    document.getElementById('sonidoEquivocado').play();
  }
  
  function reproducirSonidoPerder() {
    document.getElementById('sonidoPerder').play();
  }

let partesCasa = [
    { tipo: 'viga-horizontal', estilos: { top: '390px', left: '10px' } }, // Viga del suelo
    { tipo: 'viga-vertical', estilos: { top: '210px', left: '0px' } }, // Pared izquierda
    { tipo: 'viga-vertical', estilos: { top: '210px', left: '590px' } }, // Pared derecha
    { tipo: 'viga-horizontal', estilos: { top: '210px', left: '10px' } }, // Viga superior
    { tipo: 'techo', estilos: { top: '10px', left: '0px' } }, // Techo
    { tipo: 'ventana', estilos: { top: '250px', left: '30px' } }, // Ventana 1
    { tipo: 'ventana', estilos: { top: '250px', left: '490px' } }, // Ventana 2
    { tipo: 'ventana', estilos: { top: '410px', left: '80px' } }, // Ventana 3
    { tipo: 'ventana', estilos: { top: '410px', left: '440px' } }, // Ventana 4
    { tipo: 'puerta', estilos: { top: '430px', left: '250px' } } // Puerta
];
let parteActual = 0;
let temporizador;
let juegoTerminado = false; // Variable para controlar si el juego ha terminado

function mostrarPregunta() {
    if (preguntas.length > 0 && parteActual < preguntas.length && !juegoTerminado) {
        let preguntaActual = preguntas[parteActual];
        preguntaElemento.textContent = preguntaActual.pregunta;
        preguntaElemento.style.fontSize = '30px';
        preguntaElemento.style.fontWeight = 'bold';
        respuestasElemento.innerHTML = '';
        preguntaActual.respuestas.forEach((respuesta, index) => {
            let boton = document.createElement('button');
            boton.textContent = respuesta;
            boton.classList.add('btn', 'btn-danger', 'm-1', 'btn-lg');
            boton.addEventListener('click', () => verificarRespuesta(index, preguntaActual.respuestaCorrecta));
            respuestasElemento.appendChild(boton);
        });
    } else {
        console.log('No hay preguntas disponibles o la casa está completa.');
    }
}

function verificarRespuesta(respuestaUsuario, respuestaCorrecta) {
    if (!juegoTerminado) {
        if (respuestaUsuario === respuestaCorrecta) {
            puntuacion++;
            puntosElemento.textContent = `Puntuación: ${puntuacion}`;
            construirParteCasa();
            reproducirSonidoGanar();
            if (puntuacion === 10) {
                juegoTerminado = true;
                clearInterval(temporizador);
                mostrarMensajeGanaste();
            }
        } else {
            respuestaIncorrecta = true;
            reproducirSonidoEquivocado();
            mensajeEquivocado.innerHTML = '<p>Respuesta Erronea, Lea mas la Biblia Hermano</p>';
            mensajeEquivocado.style.fontSize = '30px';
            mensajeEquivocado.style.fontWeight = 'bold';
            mensajeEquivocado.style.display = 'block';
            mensajeEquivocado.style.color = 'red';
            clearInterval(temporizador);
            derrumbarCasa();
        }
        mostrarPregunta();
    }
}


function construirParteCasa() {
    if (parteActual < partesCasa.length && !juegoTerminado) {
        let parte = document.createElement('div');
        parte.classList.add(partesCasa[parteActual].tipo);
        Object.assign(parte.style, partesCasa[parteActual].estilos);
        casa.appendChild(parte);
        parteActual++;
    }
}

function iniciarTemporizador() {
    puntosElemento.textContent = `Puntuación: ${puntuacion}`;
    mostrarPregunta();
    console.log(tiempoRestante)
    actualizarTiempoVisual(tiempoRestante);
    temporizador = setInterval(() => {
        tiempoRestante--;
        if (tiempoRestante === 1) {
            tiempoElemento.textContent = `Tiempo restante: ${tiempoRestante} segundo`;
        } else {
            tiempoElemento.textContent = `Tiempo restante: ${tiempoRestante} segundos`;
        }
        if (tiempoRestante <= 0) {
            clearInterval(temporizador);
            derrumbarCasa();
            setTimeout(mostrarBotonReintentar, 1000);
            juegoTerminado = true;
        }
    }, 1000);
}

function derrumbarCasa() {
    Array.from(casa.children).forEach(parte => {
        parte.style.transition = 'transform 1s ease-in-out, opacity 1s ease-in-out';
        parte.style.transform = 'translateY(500px) rotate(360deg)';
        parte.style.opacity = '0';
    });
    setTimeout(() => {
        casa.innerHTML = '';
        respuestasElemento.innerHTML = '';
        preguntaElemento.innerHTML = '';
        mostrarMensajeDerrumbado();
        reproducirSonidoPerder();
    }, 1000);
}

function mostrarMensajeDerrumbado() {
    mensajeDerrumbado.innerHTML = '<p>¡Casa Derrumbada!</p>';
    mensajeDerrumbado.appendChild(crearBotonReintentar());
    mensajeDerrumbado.style.display = 'block';
}
function reiniciarJuego() {
    casa.innerHTML = '';
    respuestasElemento.innerHTML = '';
    mensajeDerrumbado.style.display = 'none';
    mensajeGanaste.style.display = 'none';
    mensajeEquivocado.style.display = 'none';
    parteActual = 0;
    puntuacion = 0;
    if (juegoTerminado === true || respuestaIncorrecta === false){
        tiempoRestante = 300;
    }
    respuestaIncorrecta=false
    preguntas.sort(() => Math.random() - 0.5);
    puntosElemento.textContent = puntuacion; // Actualizar el texto de puntosElemento
    juegoTerminado = false;
    mostrarPregunta();
    iniciarTemporizador(); // Llamar a iniciarTemporizador()
}

function mostrarMensajeGanaste() {
    mensajeGanaste.innerHTML = '<p>¡Ganaste! ¡Construiste la casa completa!</p>';
    mensajeGanaste.appendChild(crearBotonReintentar());
    mensajeGanaste.style.display = 'block';
    respuestasElemento.innerHTML = '';
    preguntaElemento.innerHTML = '';
}

function crearBotonReintentar() {
    let botonReintentar = document.createElement('button');
    botonReintentar.id = 'boton-reintentar';
    botonReintentar.classList.add('btn','btn-danger', 'btn-lg');
    botonReintentar.textContent = 'Reintentar';
    botonReintentar.addEventListener('click', reiniciarJuego);
    return botonReintentar;
}
iniciarTemporizador();