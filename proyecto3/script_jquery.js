// Define the Teatro class
class Teatro{
    constructor(nombrePelicula, precioBoleto, filas, columnas){
        // Initialize properties
        this.nombrePelicula = nombrePelicula;
        this.precioBoleto = precioBoleto;
        this.filas = filas;
        this.columnas = columnas;
        // Initialize matrices to keep track of seats
        this.asientosReservados = Array.from({length: filas}, () => Array.from({length: columnas}, () => false));
        this.asientosConfirmados = Array.from({length: filas}, () => Array.from({length: columnas}, () => false));
        // Load seats from local storage or generate them if they don't exist
        this.asientos = JSON.parse(localStorage.getItem('guardarAsiento')) || this.generarAsientos();
        localStorage.setItem('guardarAsiento', JSON.stringify(this.asientos));
        this.reservaHecha = false;

    }


    // Method to register a purchase
    registrarCompra(){
        const compra = this.calcularReserva(); // Get the reservation information
        const comprasAnteriores = JSON.parse(sessionStorage.getItem('compras')) || [];
        comprasAnteriores.push(compra);
        sessionStorage.setItem('compras', JSON.stringify(comprasAnteriores));
    }

    // Method to generate seats
    generarAsientos() {
        return Array.from({length: this.filas}, (_, i) => 
            Array.from({length: this.columnas}, (_, j) => ({number: j + 1, inmutable: Math.random() < 0.5}))
        );
    }


     // Method to reserve a seat
     reservarAsiento(fila, columna) {
        // verificar si la fila y columna están dentro de los límites y si el asiento no está reservado ni es inmutable
        if (fila >= 0 && fila < this.filas && columna >= 0 && columna < this.columnas && !this.asientosReservados[fila][columna] && !this.asientos[fila][columna].inmutable) {
            this.asientosReservados[fila][columna] = true;
            this.reservaHecha = true;
            return true; // Indicar que la reserva fue exitosa
        }
        return false; // Indicar que la reserva falló
    }

    // Method to cancel a seat reservation
    cancelarReserva(fila, columna) {
        const elementoAsiento = document.getElementById(`asiento-${fila}-${columna}`);
        // Verify if the row and column are within the limits and if the seat is reserved and not immutable
        if (fila >= 0 && fila < this.filas && columna >= 0 && columna < this.columnas && this.asientosReservados[fila][columna] && !this.asientos[fila][columna].inmutable && elementoAsiento.classList.contains('reservado')) {
            this.asientosReservados[fila][columna] = false; // Update the state of the seat in the reserved seats matrix
            elementoAsiento.classList.replace('reservado', 'libre'); // Update the state of the seat in the DOM
            return true;
        }
        return false;
    }


    // Method to calculate the total of the reservation and the selected seats
    calcularReserva() {
        let cantidad = 0;
        let asientosSeleccionados = [];
        // Iterate over the reserved seats matrix to count the reserved seats and get their positions
        for(let i = 0; i < this.filas; i++) {
            for(let j = 0; j < this.columnas; j++) {
                if (this.asientosReservados[i][j]) {
                    cantidad++;
                    asientosSeleccionados.push(`${i + 1}-${j + 1}`);
                }
            }
        }
        // Calculate the total price of the reservation
        let precioTotal = cantidad * this.precioBoleto;
        return {cantidad, precioTotal, asientosSeleccionados}; // Return an object with the quantity, the total price, and the positions of the reserved seats
    }

    // method to remove a seat from the reservation
    quitarAsiento(fila, columna) {
        if(fila >= 0 && fila < this.filas && columna >= 0 && columna < this.columnas && this.asientosReservados[fila][columna]) {
            this.asientosReservados[fila][columna] = false;
            return true;
        }
        return false;
    }

    // Method to show the seats using jQuery
    mostrarAsientos() {
        const asientoContenedor = $('#asiento-container');
        const elementoCosteTotal = $('#costo-total');
        asientoContenedor.html('');
        this.asientos.forEach((fila, i) => {
            const elementoFila = $('<div>');
            elementoFila.addClass('fila');
            fila.forEach((asiento, j) => {
                const elementoAsiento = $('<div>');
                elementoAsiento.text(asiento.number);
                elementoAsiento.addClass(asiento.inmutable ? 'inmutable' : this.asientosReservados[i][j] ? 'reserva' : 'libre');
                elementoAsiento.attr('id', `asiento-${i}-${j}`);
                elementoAsiento.on('click', () => {
                    if (!asiento.inmutable && !asiento.reserva) {
                        if (elementoAsiento.hasClass('libre')) {
                            elementoAsiento.removeClass('libre');
                            elementoAsiento.addClass('en_reserva');
                            this.reservarAsiento(i, j);
                            this.actualizarCosto(elementoCosteTotal);
                            // add animation for reserved seats
                            elementoAsiento.animate({
                                opacity: 0.5,
                                fontSize: '+=10px',
                            }, 500, function(){
                                // complete animation
                                elementoAsiento.animate({
                                    opacity: 1,
                                    fontSize: '-=10px',
                                }, 500);
                            });
                        } else if (elementoAsiento.hasClass('en_reserva')) {
                            elementoAsiento.removeClass('en_reserva');
                            elementoAsiento.addClass('libre');
                            this.quitarAsiento(i, j);
                            this.actualizarCosto(elementoCosteTotal);
                            // add animation for removing seat
                            elementoAsiento.animate({
                                opacity: 0.5,
                                fontSize: '+=10px',
                            }, 500, function(){
                                // complete animation
                                elementoAsiento.animate({
                                    opacity: 1,
                                    fontSize: '-=10px',
                                }, 500);
                            });
                        }
                    } else if (asiento.inmutable) {
                        // add animation for immutable seats
                        elementoAsiento.animate({
                            opacity: 0.5,
                            fontSize: '+=10px',
                        }, 500, function() {
                            // complete animation
                            elementoAsiento.animate({
                                opacity: 1,
                                fontSize: '-=10px',
                                
                            }, 500);
                        });
                    }
                });
                elementoAsiento.on('mouseover', function(){
                    // Add animation when hovering over the seat
                    $(this).animate({
                        height: '+=10px',
                    }, 200);
                }).on('mouseout', function() {
                        // Revert animation when removing the mouse
                        $(this).animate({
                            height: '-=10px',
                        }, 200);
                    });
                elementoFila.append(elementoAsiento);
            });
            asientoContenedor.append(elementoFila);
        });
    }

    // Method to update the total cost using jQuery
    actualizarCosto(elementoCosteTotal) {
        $('#costo-total').text(this.calcularReserva().precioTotal);
    }

    // Method to make the reserved seats immutable
    confirmarCompra() {
        for(let i = 0; i < this.filas; i++) {
            for(let j = 0; j < this.columnas; j++) {
                if (this.asientosReservados[i][j]) {
                    this.asientos[i][j].inmutable = true;
                    this.asientosReservados[i][j] = false;
                }
            }
        }
        // Save the state of the seats in local storage
        localStorage.setItem('guardarAsiento', JSON.stringify(this.asientos));
        this.reservaHecha = false; // Set reservationMade to false when the purchase is confirmed
    }
}


// Create three movies with different seat configurations
const teatro1 = new Teatro("The First Slam Dunk", 5, 10, 10);
const teatro2 = new Teatro("Saw X", 8, 12, 12);
const teatro3 = new Teatro("Avatar", 10, 10, 10);

let teatroActual;

// Function to show the seats using jQuery
function mostrarAsientos(teatro){
    teatroActual = teatro;
    teatroActual.mostrarAsientos();
    cambiarEstadoAsientos();
    actualizarCosto();
    $('#asiento-container').css('display', 'block');
    $('#costo-container').css('display', 'block');
}

// Function to update the total cost using jQuery
function actualizarCosto(){
    $('#costo-total').text(teatroActual.calcularReserva().precioTotal);
}



// Function to change the state of the seat from "en_reserva" to "ocupado" using jQuery
function cambiarEstadoAsientos(){
    // Get all elements with the class "en_reserva"
    const asientoEnReserva = $('.en_reserva');

    // Change the class from "en_reserva" to "ocupado" for each seat in reservation
    asientoEnReserva.each(function(){
        $(this).removeClass('en_reserva').addClass('reservado');
    });

    // update the total cost
    actualizarCosto();
}


// Add a click event to the confirm purchase button using jQuery
$('#confirmar-compra').on('click', function() {
    if(teatroActual){
        if(teatroActual.reservaHecha) { // Check if a reservation has been made before allowing the purchase confirmation
            const reserva = teatroActual.calcularReserva();
            if(reserva.cantidad > 0){
                teatroActual.registrarCompra();
                teatroActual.confirmarCompra(); // Make the reserved seats immutable
                alert(`Compra registrada. Has comprado ${reserva.cantidad} asiento(s) por un total de ${reserva.precioTotal}€. Gracias por su compra.`);
                sessionStorage.removeItem('guardarAsiento'); // Clear the seats after the purchase
                location.reload(); // Reload the page to restart
            } else {
                alert ('No se ha seleccionado ningun asiento.');
            }
        } else {
            alert('Por favor, reserve un asiento antes de confirmar la compra.');
        }
    }
});
// Add animation to the confirm purchase button when clicked
$('#confirmar-compra').on('click', function() {
    $(this).animate({ opacity: 0.5 }, 200).animate({ opacity: 1 }, 200);
});


// Add a click event to the cancel reservation button using jQuery
$('#cancelar-reserva').on('click', function() {
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
            teatroActual.actualizarCosto(document.getElementById('costo-total'));// Update the total cost
        } else {
            alert('No se pudo cancelar ninguna reserva. Por favor, asegúrese de que hay asientos en reserva y que no son inmutables.');
        }
    }
});

// Add animation to the cancel reservation button when clicked
$('#cancelar-reserva').on('click', function() {
    $(this).animate({ opacity: 0.5 }, 200).animate({ opacity: 1 }, 200);
});

// Add a click event to the "Reservar" button that calls the function using jQuery
$('#reservar-button').on('click', cambiarEstadoAsientos);
// Add animation to the "Reservar" button when clicked
$('#reservar-button').on('click', function() {
    $('#reservar-button').animate({ 
        opacity: 0.5,
        marginLeft: '+=10px',
        marginRight: '-=10px'
    }, 200, function() {
        $('#reservar-button').animate({ 
            opacity: 1,
            marginLeft: '-=10px',
            marginRight: '+=10px'
        }, 200);
    });
});

