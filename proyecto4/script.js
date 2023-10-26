/*
    Creador: Bladimir Peralta Herrera
    Nombre del proyecto: Slide puzzle
    Fase: Alfa
    version: 0.0.0
    Estado: incompleto
*/
// Funcionalidad de las piezas

document.querySelector('.inicio').addEventListener('click', function() {
    var piezas = Array.from(document.querySelectorAll('.pieza:not(#pieza-vacia)'));
    var ids = piezas.map(function(pieza) {
        return pieza.id;
    });

    // Mezclar los ids
    for (let i = ids.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [ids[i], ids[j]] = [ids[j], ids[i]];
    }

    // Asignar los ids mezclados a las piezas
    piezas.forEach(function(pieza, index) {
        pieza.id = ids[index];
    });
});


// Función para comprobar si el puzzle está completo
function isPuzzleComplete() {
    var piezas = Array.from(document.querySelectorAll('.pieza:not(#pieza-vacia)'));
    for (var i = 0; i < piezas.length; i++) {
        if (piezas[i].id !== 'pieza-' + (i + 1)) {
            return false;
        }
    }
    return true;
}

// Variable para contar los movimientos
var movimientos = 0;

// Elemento para mostrar los movimientos
var contadorMovimientos = document.querySelector('#movimientos');

// Función para comprobar si el puzzle está completo
function isPuzzleComplete() {
    var piezas = Array.from(document.querySelectorAll('.pieza:not(#pieza-vacia)'));
    for (var i = 0; i < piezas.length; i++) {
        if (piezas[i].id !== 'pieza-' + (i + 1)) {
            return false;
        }
    }
    return true;
}

// Función para intercambiar dos elementos
function swapElements(obj1, obj2) {
    try {
        var temp = document.createElement("div");
        obj1.parentNode.insertBefore(temp, obj1);
        obj2.parentNode.insertBefore(obj1, obj2);
        temp.parentNode.insertBefore(obj2, temp);
        temp.parentNode.removeChild(temp);
    } catch (error) {
        console.log("Error al intercambiar elementos: ", error);
    }
}

try {
    var piezas = Array.from(document.querySelectorAll('.pieza'));
    piezas.forEach(function(pieza) {
        pieza.addEventListener('click', function() {
            try {
                var piezaVacia = document.querySelector('#pieza-vacia');
                var esAdyacente = 
                    (pieza.cellIndex === piezaVacia.cellIndex && Math.abs(pieza.parentNode.rowIndex - piezaVacia.parentNode.rowIndex) === 1) ||
                    (pieza.parentNode.rowIndex === piezaVacia.parentNode.rowIndex && Math.abs(pieza.cellIndex - piezaVacia.cellIndex) === 1);

                if (esAdyacente) {
                    console.log('Moviendo la pieza: ', pieza.id); // Agregar esta línea
                    swapElements(pieza, piezaVacia);
                    movimientos++; // Incrementar el contador de movimientos
                    contadorMovimientos.textContent = movimientos; // Actualizar el contador de movimientos en la página HTML
                    console.log('Movimiento número: ', movimientos); // Imprimir el número de movimientos
                    console.log('Piezas después del movimiento: ', Array.from(document.querySelectorAll('.pieza')).map(p => p.id).join(', ')); // Agregar esta línea

                    // Comprobar si el puzzle está completo después de mover una pieza
                    if (isPuzzleComplete()) {
                        alert('¡Has completado el puzzle con éxito en ' + movimientos + ' movimientos!');
                    }
                }
            } catch (error) {
                console.log("Error al manejar el evento click: ", error);
            }
        });
    });
} catch (error) {
    console.log("Error al configurar los controladores de eventos: ", error);
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

// Iniciar el temporizador cuando se hace clic en el botón de inicio
document.querySelector('.inicio').addEventListener('click', function() {
    segundos = 0;
    minutos = 0;
    contadorSegundos.textContent = '00';
    contadorMinutos.textContent = '00';
    iniciarTemporizador();
});

// Detener el temporizador y comprobar si es el mejor tiempo cuando se completa el puzzle
if (isPuzzleComplete()) {
    detenerTemporizador();
}






