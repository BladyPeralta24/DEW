// Definir la clase Teatro
class Teatro{
    constructor(nombrePelicula, precioBoleto, filas, columnas){
        //Inicializamos las propiedades
        this.nombrePelicula = nombrePelicula;
        this.precioBoleto = precioBoleto;
        this.filas = filas;
        this.columnas = columnas;
        this.asientosReservados = Array.from({length: filas}, () => Array.from({length: columnas}, () => false));
        this.asientosConfirmados = Array.from({length: filas}, () => Array.from({length: columnas}, () => false));
        this.asientos = JSON.parse(localStorage.getItem('guardarAsiento')) || this.generarAsientos();
        localStorage.setItem('guardarAsiento', JSON.stringify(this.asientos));
        this.reservaHecha = false;

    }


    // Metodo para registrar una compra
    registrarCompra(){
        const compra = this.calcularReserva(); // Obtener la informacion de la reserva
        const comprasAnteriores = JSON.parse(sessionStorage.getItem('compras')) || [];
        comprasAnteriores.push(compra);
        sessionStorage.setItem('compras', JSON.stringify(comprasAnteriores));
    }

    //Creacion de metodos de la clase

    generarAsientos() {
        return Array.from({length: this.filas}, (_, i) => 
            Array.from({length: this.columnas}, (_, j) => ({number: j + 1, inmutable: Math.random() < 0.5}))
        );
    }



     // Método para reservar un asiento
     reservarAsiento(fila, columna) {
        if (fila >= 0 && fila < this.filas && columna >= 0 && columna < this.columnas && !this.asientosReservados[fila][columna] && !this.asientos[fila][columna].inmutable) {
            this.asientosReservados[fila][columna] = true;
            this.reservaHecha = true;
            return true;
        }
        return false;
    }

    cancelarReserva(fila, columna) {
        const elementoAsiento = document.getElementById(`asiento-${fila}-${columna}`);
        if (fila >= 0 && fila < this.filas && columna >= 0 && columna < this.columnas && this.asientosReservados[fila][columna] && !this.asientos[fila][columna].inmutable && elementoAsiento.classList.contains('reservado')) {
            this.asientosReservados[fila][columna] = false;
            elementoAsiento.classList.replace('reservado', 'libre'); // Actualizar el estado del asiento en el DOM
            return true;
        }
        return false;
    }



    // Método para calcular el total de la reserva y los asientos seleccionados
    calcularReserva() {
        let cantidad = 0;
        let asientosSeleccionados = [];
        for(let i = 0; i < this.filas; i++) {
            for(let j = 0; j < this.columnas; j++) {
                if (this.asientosReservados[i][j]) {
                    cantidad++;
                    asientosSeleccionados.push(`${i + 1}-${j + 1}`);
                }
            }
        }
        let precioTotal = cantidad * this.precioBoleto;
        return {cantidad, precioTotal, asientosSeleccionados};
    }

    quitarAsiento(fila, columna) {
        if(fila >= 0 && fila < this.filas && columna >= 0 && columna < this.columnas && this.asientosReservados[fila][columna]) {
            this.asientosReservados[fila][columna] = false;
            return true;
        }
        return false;
    }

    // Metodo para mostrar los asientos usando DOM
    mostrarAsientos() {
        const asientoContenedor = document.getElementById('asiento-container');
        const elementoCosteTotal = document.getElementById('costo-total');
        asientoContenedor.innerHTML = '';
        this.asientos.forEach((fila, i) => {
            const elementoFila = document.createElement('div');
            elementoFila.className = 'fila';
            fila.forEach((asiento, j) => {
                const elementoAsiento = document.createElement('div');
                elementoAsiento.textContent = asiento.number;
                elementoAsiento.classList.add(asiento.inmutable ? 'inmutable' : this.asientosReservados[i][j] ? 'reserva' : 'libre');
                elementoAsiento.id = `asiento-${i}-${j}`;
                elementoAsiento.addEventListener('click', () => {
                    if (!asiento.inmutable || !asiento.reserva) {
                        if (!elementoAsiento.classList.contains('en_reserva')) {
                            elementoAsiento.classList.replace('libre', 'en_reserva');
                            this.reservarAsiento(i, j);
                            this.actualizarCosto(elementoCosteTotal);
                        } else {
                            elementoAsiento.classList.replace('en_reserva', 'libre');
                            this.quitarAsiento(i, j);
                            this.actualizarCosto(elementoCosteTotal);
                        }
                    }
                });
                elementoFila.appendChild(elementoAsiento);
            });
            asientoContenedor.appendChild(elementoFila);
        });
    }

    // Metodo para actualizar el costo total
    actualizarCosto(elementoCosteTotal) {
        elementoCosteTotal.textContent = this.calcularReserva().precioTotal;
    }

    // Metodo para hacer inmutable los asientos reservados
    confirmarCompra() {
        for(let i = 0; i < this.filas; i++) {
            for(let j = 0; j < this.columnas; j++) {
                if (this.asientosReservados[i][j]) {
                    this.asientos[i][j].inmutable = true;
                    this.asientosReservados[i][j] = false;
                }
            }
        }
        // Guardar el estado de los asientos en el almacenamiento local
        localStorage.setItem('guardarAsiento', JSON.stringify(this.asientos));
        this.reservaHecha = false; // Establecer reservaHecha en false cuando se confirma la compra
    }
}


// Crear tres peliculas con diferentes configuraciones de asientos
const teatro1 = new Teatro("The First Slam Dunk", 5, 10, 10);
const teatro2 = new Teatro("Saw X", 8, 12, 12);
const teatro3 = new Teatro("Avatar", 10, 10, 10);

let teatroActual;

function mostrarAsientos(teatro){
    teatroActual = teatro;
    teatroActual.mostrarAsientos();
    cambiarEstadoAsientos();
    actualizarCosto();
    document.getElementById('asiento-container').style.display = 'block';
    document.getElementById('costo-container').style.display = 'block';
}

// Funcion para actualizar el costo total
function actualizarCosto(){
    document.getElementById('costo-total').textContent = teatroActual.calcularReserva().precioTotal;
}




// Funcion para cambiar el estado del asiento de "en_reserva" a "ocupado"
function cambiarEstadoAsientos(){
    // obtener todos los elementos con la clase "en_reserva"
    const asientoEnReserva = document.querySelectorAll('.en_reserva');

    // Cambia la clase de "en_reserva" a "ocupado" para cada asiento en reserva
    asientoEnReserva.forEach(asiento => {
        asiento.classList.replace('en_reserva', 'reservado');
    });

    // Actualizar el costo total
    actualizarCosto();
}


  
// obtener una referencia al boton "Reservar" por su ID
const reservarButton = document.getElementById('reservar-button');
const confirmarCompraButton = document.getElementById('confirmar-compra');
const cancelarReservaButton = document.getElementById('cancelar-reserva');


// Agregar un evento de clic al boton de confirmar compra
confirmarCompraButton.addEventListener('click', () => {
    if(teatroActual){
        if(teatroActual.reservaHecha) { // Verificar si se ha hecho una reserva antes de permitir la confirmación de la compra
            const reserva = teatroActual.calcularReserva();
            if(reserva.cantidad > 0){
                teatroActual.registrarCompra();
                teatroActual.confirmarCompra(); // Hacer inmutables los asientos reservados
                alert(`Compra registrada. Has comprado ${reserva.cantidad} asiento(s) por un total de ${reserva.precioTotal}€. Gracias por su compra.`);
                sessionStorage.removeItem('guardarAsiento'); // Limpia los asientos despues de la compra
                location.reload(); // Recargar la página para reiniciar
            } else {
                alert ('No se ha seleccionado ningun asiento.');
            }
        } else {
            alert('Por favor, reserve un asiento antes de confirmar la compra.');
        }
    }
});

// Agregar un evento de clic al boton de cancelar reserva
cancelarReservaButton.addEventListener('click', () => {
    if(teatroActual){
        let cancelacionesExitosas = 0;
        for(let i = 0; i < teatroActual.filas; i++) {
            for(let j = 0; j < teatroActual.columnas; j++) {
                if(teatroActual.asientosReservados[i][j] && teatroActual.cancelarReserva(i, j)){
                    cancelacionesExitosas++;
                }
            }
        }
        if(cancelacionesExitosas > 0){
            alert(`Reservas canceladas: ${cancelacionesExitosas}.`);
            teatroActual.actualizarCosto(document.getElementById('costo-total')); // Actualizar el costo total
        } else {
            alert('No se pudo cancelar ninguna reserva. Por favor, asegúrese de que hay asientos en reserva y que no son inmutables.');
        }
    }
});

// Agregar un evento de clic al boton "Reservar" que llama a la funcion
reservarButton.addEventListener('click', cambiarEstadoAsientos);