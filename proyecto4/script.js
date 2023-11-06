
let leaderboard = JSON.parse(localStorage.getItem('leaderboard')) || [];

// Funcion para mostrar el leaderboard
function mostrarLeaderboard(){
    // Ordenar el leaderboard por tiempo (ascendente)
    leaderboard.sort((a,b) => a.tiempo - b.tiempo);

    // Crear una tabla para mostrar el leaderboard
    let tablaLeaderboard = document.createElement('table');
    tablaLeaderboard.innerHTML = '<tr><th>Nombre</th><th>Tiempo</th><th>Moviemientos</th></tr>';

    leaderboard.forEach(function (jugador){
        let fila = document.createElement('tr');
        fila.innerHTML = `<td>${jugador.nombre}</td><td>${jugador.tiempo} segundos</td><td>${jugador.movimientos}</td>`;
        tablaLeaderboard.appendChild(fila);
    });

    // mostrar el leaderboard en el elemento HTML
    let leaderboardContainer = document.querySelector('#leaderboard');
    leaderboardContainer.innerHTML = '';
    leaderboardContainer.appendChild(tablaLeaderboard);
}

// Funcion para registrar el resultado en el leaderboard
function registrarResultadoEnLeaderboard(nombre, tiempo, movimientos){
    leaderboard.push({nombre, tiempo, movimientos});
    localStorage.setItem('leaderboard', JSON.stringify(leaderboard));
    mostrarLeaderboard();

    // Para limpiar la leaderBoard
    //localStorage.clear();
}

// Variable para contar los movimientos
var movimientos = 0;

// Elemento para mostrar los movimientos
var contadorMovimientos = document.querySelector('#movimientos');


function isPuzzleComplete() {
    var piezas = Array.from(document.querySelectorAll('.pieza:not(#pieza-vacia)'));
    var cols = 3;
    var puzzleSolved = true;

    for (let i = 0; i < piezas.length; i++) {
        var pieza = piezas[i];
        var row = Math.floor(i / cols);
        var col = i % cols;
        var expectedId = 'pieza-' + (row * cols + col + 1);

        if (pieza.id !== expectedId) {
            puzzleSolved = false;
        }
    }

    return puzzleSolved;
}




// Función para intercambiar dos elementos
function swapElements(obj1, obj2) {
    // Verificar si los elementos son válidos antes de realizar el intercambio
    if (obj1 && obj2 && obj1.parentNode && obj2.parentNode) {
        var temp = document.createElement("div");
        obj1.parentNode.insertBefore(temp, obj1);
        obj2.parentNode.insertBefore(obj1, obj2);
        temp.parentNode.insertBefore(obj2, temp);
        temp.parentNode.removeChild(temp);
    } else {
        console.log("Error: Los elementos proporcionados no son válidos para intercambiar.");
    }
}


// Obtener todas las piezas y verificar que existan
var piezas = Array.from(document.querySelectorAll('.pieza'));
if (piezas.length > 0) {
    // Asignar un controlador de eventos 'click' a cada pieza
    piezas.forEach(function(pieza) {
        pieza.addEventListener('click', function() {
            // Buscar la pieza vacía en el tablero
            var piezaVacia = document.querySelector('#pieza-vacia');
            if (!piezaVacia) {
                // Imprimir un mensaje de error si no se encuentra la pieza vacía
                console.error("Error: No se encontró la pieza vacía.");
                return; // Salir de la función
            }

            // Comprobar si la pieza clicada es adyacente a la pieza vacía
            var esAdyacente =
                (pieza.cellIndex === piezaVacia.cellIndex && Math.abs(pieza.parentNode.rowIndex - piezaVacia.parentNode.rowIndex) === 1) ||
                (pieza.parentNode.rowIndex === piezaVacia.parentNode.rowIndex && Math.abs(pieza.cellIndex - piezaVacia.cellIndex) === 1);

            if (esAdyacente) {
                // Mover la pieza si es adyacente a la pieza vacía
                console.log('Moviendo la pieza: ', pieza.id); // Agregar esta línea
                swapElements(pieza, piezaVacia);
                movimientos++; // Incrementar el contador de movimientos
                contadorMovimientos.textContent = movimientos; // Actualizar el contador de movimientos en la página HTML
                console.log('Movimiento número: ', movimientos); // Imprimir el número de movimientos
                console.log('Piezas después del movimiento: ', Array.from(document.querySelectorAll('.pieza')).map(p => p.id).join(', ')); // Agregar esta línea
            }
        });
    });
} else {
    // Imprimir un mensaje de error si no se encuentran piezas para configurar los controladores de eventos
    console.error("Error: No se encontraron piezas para configurar los controladores de eventos.");
}


// Variables para el temporizador
var segundos = 0;
var minutos = 0;
var temporizador;

// Elementos para mostrar el tiempo
var contadorSegundos = document.querySelector('#segundos');
var contadorMinutos = document.querySelector('#minutos');

// Función para iniciar el temporizador
function iniciarTemporizador() {
    temporizador = setInterval(function() {
        segundos++;
        if (segundos >= 60) {
            minutos++;
            segundos = 0;
        }
        contadorSegundos.textContent = segundos < 10 ? '0' + segundos : segundos;
        contadorMinutos.textContent = minutos < 10 ? '0' + minutos : minutos;
    }, 1000);
}

// Función para detener el temporizador y comprobar si es el mejor tiempo
function detenerTemporizador() {
    clearInterval(temporizador);
    var tiempoActual = minutos * 60 + segundos;
    var mejorTiempo = localStorage.getItem('mejorTiempo');
    if (!mejorTiempo || tiempoActual < mejorTiempo) {
        localStorage.setItem('mejorTiempo', tiempoActual);
        alert('¡Nuevo récord! Has completado el puzzle en ' + minutos + ' minutos y ' + segundos + ' segundos.');
    }
}

const elementoMensaje = document.getElementById("mensaje");
elementoMensaje.style.display = 'none';
function mostrarMensaje(){
    elementoMensaje.style.display = 'block';
    elementoMensaje.textContent = 'Has completado el puzzle. ¡¡ Felicidades !!';
}

let nombreJugador = ''; //Variable para almacenar el nombre del jugador

let playerName = document.querySelector('.jugador');
playerName.style.display = 'none';

function showPlayer(){
    playerName.style.display = 'block';
}


document.getElementById('botonGuardar').addEventListener('click', function(){
    let inputNombreJugador = document.getElementById('nombreJugador');
    let nuevoNombreJugador = inputNombreJugador.value.trim();
    if (nuevoNombreJugador !== ''){
        nombreJugador = nuevoNombreJugador; // Actualizar la variable 'nombreJugador'
        // Guardar el nombre del jugador en el leaderboard
        registrarResultadoEnLeaderboard(nombreJugador, minutos * 60 + segundos, movimientos);
        mostrarLeaderboard(); // Actualizar la vista del leaderboard
        playerName.style.display = 'none'; // Esconder el área de ingreso del nombre del jugador
    } else {
        console.log("El nombre del jugador no puede estar vacío.");
    }

    
});


// Prubas con solo mover 3 piezas
/* document.querySelector('.inicio').addEventListener('click', function() {
    // Obtener las piezas 5, 6 y 8
    var pieza5 = document.getElementById('pieza-5');
    var pieza6 = document.getElementById('pieza-6');
    var pieza8 = document.getElementById('pieza-8');

    // Guardar el id de la pieza-5 antes de cambiarlo
    var idPieza5 = pieza5.id;

    // Cambiar las posiciones de las piezas
    pieza5.id = pieza6.id;
    pieza6.id = pieza8.id;
    pieza8.id = idPieza5;

    
    segundos = 0;
    minutos = 0;
    contadorSegundos.textContent = '00';
    contadorMinutos.textContent = '00';
    iniciarTemporizador();

    // desactivar el boton despues de hacer clic
    this.disabled = true; // Esto desactivará el botón

}); */


const botonInicio = document.querySelector('.inicio');
botonInicio.addEventListener('click', function() {

    segundos = 0;
    minutos = 0;
    movimientos = 0;
    contadorSegundos.textContent = '00';
    contadorMinutos.textContent = '00';
    contadorMovimientos.textContent = '0';

    // Ocultar mensaje
    elementoMensaje.style.display = 'none';
    botonInicio.style.display = 'none';

    var piezas = Array.from(document.querySelectorAll('.pieza:not(#pieza-vacia)'));
    var piezasIds = piezas.map(function(pieza) {
        return pieza.id;
    });

    // Función para barajar las piezas
    function barajarPiezas(piezasIds) {
        let currentIndex = piezasIds.length, tempValue, randomIndex;

        // Mientras haya elementos para barajar
        while (0 !== currentIndex) {
            // Escoger un elemento restante
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // Intercambiar con el elemento actual
            tempValue = piezasIds[currentIndex];
            piezasIds[currentIndex] = piezasIds[randomIndex];
            piezasIds[randomIndex] = tempValue;
        }

        // Asignar los ids mezclados a las piezas
        piezas.forEach(function(pieza, index) {
            pieza.id = piezasIds[index];
        });
    }

    // Función para verificar la resolución
    function esResoluble(piezasIds) {
        let inversiones = 0;
        for (let i = 0; i < piezasIds.length; i++) {
            for (let j = i + 1; j < piezasIds.length; j++) {
                if (piezasIds[i] > piezasIds[j] && piezasIds[j] !== 'pieza-vacia') {
                    inversiones++;
                }
            }
        }
        return inversiones % 2 === 0;
    }

    // Barajar las piezas
    barajarPiezas(piezasIds);

    // Si la configuración inicial no es resoluble, barajar nuevamente hasta obtener una configuración resoluble
    while (!esResoluble(piezasIds)) {
        barajarPiezas(piezasIds);
    }

    segundos = 0;
    minutos = 0;
    contadorSegundos.textContent = '00';
    contadorMinutos.textContent = '00';
    iniciarTemporizador();

    // Verificar si el puzzle está completo después de mover una pieza
    var intervaloJuego = setInterval(() => {
        if (isPuzzleComplete()) {
            clearInterval(intervaloJuego);
            detenerTemporizador();
            console.log('Puzzle completado. Fin del juego');
            mostrarMensaje();
            showPlayer();
            alert('¡Has terminado el puzzle con éxito en ' + movimientos + ' movimientos!');
            registrarResultadoEnLeaderboard(nombreJugador, minutos * 60 + segundos, movimientos);
            mostrarLeaderboard(); // Mostrar el leaderboard después de registrar el resultado
            botonInicio.style.display = 'block';
        }
    }, 1000);
    
});






