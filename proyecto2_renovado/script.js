// Declaración de la clase Movie para representar una película y sus asientos
class Movie {
    // Constructor que recibe el número de filas y asientos por fila
    constructor(rows, seatsPerRow) {
        this.rows = rows; // Guarda el número de filas
        this.seatsPerRow = seatsPerRow; // Guarda el número de asientos por fila
        this.seats = this.generateSeats(); // Genera los asientos y los guarda
        this.totalCost = 0; // Inicializa el costo total
    }

    // Método para generar los asientos de manera aleatoria
    generateSeats() {
        const seats = [];

        for (let i = 1; i <= this.rows; i++) {
            const row = [];

            for (let j = 1; j <= this.seatsPerRow; j++) {
                const isReserved = Math.random() < 0.5; // Decide aleatoriamente si un asiento está reservado
                row.push({ number: j, reserved: isReserved }); // Agrega un objeto de asiento a la fila
            }

            seats.push(row); // Agrega la fila de asientos a la lista de asientos
        }

        return seats; // Devuelve la lista completa de asientos
    }

    // Método para renderizar los asientos en el contenedor
    renderSeats() {
        const seatsContainer = document.getElementById('seats-container'); // Obtiene el contenedor de asientos del DOM
        seatsContainer.innerHTML = ''; // Limpia el contenido actual del contenedor

        for (let i = 0; i < this.seats.length; i++) {
            const row = this.seats[i]; // Obtiene una fila de asientos
            const rowElement = document.createElement('div'); // Crea un elemento div para representar la fila
            rowElement.className = 'row'; // Agrega una clase CSS 'row' al elemento fila

            for (let j = 0; j < row.length; j++) {
                const seat = row[j]; // Obtiene un asiento de la fila
                const seatElement = document.createElement('div'); // Crea un elemento div para representar el asiento
                seatElement.textContent = seat.number; // Establece el número del asiento como texto del elemento

                if (seat.reserved) {
                    seatElement.className = 'reserved'; // Si el asiento está reservado, agrega la clase 'reserved' al elemento
                } else {
                    seatElement.className = 'available'; // Si el asiento está disponible, agrega la clase 'available' al elemento
                }

                rowElement.appendChild(seatElement); // Agrega el elemento de asiento a la fila
            }

            seatsContainer.appendChild(rowElement); // Agrega la fila al contenedor de asientos
        }
    }

    // Método para reservar un asiento en una fila y número específicos
    reservarAsiento(row, seatNumber) {
        const seat = this.seats[row - 1][seatNumber - 1]; // Obtiene el asiento especificado
        if (seat.reserved) {
            alert('Este asiento ya está reservado.'); // Muestra una alerta si el asiento ya está reservado
        } else {
            seat.reserved = true; // Marca el asiento como reservado
            this.totalCost += 10; // Aumenta el costo total
            this.renderSeats(); // Vuelve a renderizar los asientos actualizados
            actualizarCosto(); // Actualiza el costo en la interfaz
        }
    }

    // Método para liberar un asiento en una fila y número específicos
    liberarAsiento(row, seatNumber) {
        const seat = this.seats[row - 1][seatNumber - 1]; // Obtiene el asiento especificado
        if (seat.reserved) {
            seat.reserved = false; // Marca el asiento como libre
            this.totalCost -= 10; // Reduce el costo total
            this.renderSeats(); // Vuelve a renderizar los asientos actualizados
            actualizarCosto(); // Actualiza el costo en la interfaz
        } else {
            alert('Este asiento ya está libre.'); // Muestra una alerta si el asiento ya está libre
        }
    }
}

// Crea tres películas con diferentes configuraciones de asientos
const movie1 = new Movie(5, 6);
const movie2 = new Movie(6, 7);
const movie3 = new Movie(4, 8);

let currentMovie = movie1; // Establece la película actual como movie1

// Función para mostrar los asientos de una película y actualizar el costo
function mostrarAsientos(movie) {
    const seatsContainer = document.getElementById('seats-container'); // Obtiene el contenedor de asientos del DOM
    const costoContainer = document.getElementById('costo-container'); // Obtiene el contenedor del costo del DOM
    const botonesContainer = document.getElementById('botones-container'); // Obtiene el contenedor de botones del DOM
    currentMovie = movie; // Establece la película actual
    currentMovie.renderSeats(); // Renderiza los asientos de la película actual
    actualizarCosto(); // Actualiza el costo en la interfaz
    seatsContainer.style.display = 'block'; // Muestra el contenedor de asientos
    costoContainer.style.display = 'block'; // Muestra el contenedor del costo
    botonesContainer.style.display = 'block'; // Muestra el contenedor de botones
}

// Función para actualizar el costo en la interfaz
function actualizarCosto() {
    const costoTotalElement = document.getElementById('costo-total'); // Obtiene el elemento del costo total del DOM
    costoTotalElement.textContent = currentMovie.totalCost; // Actualiza el texto del costo total
}

// Agregar controladores de eventos para los botones de películas
document.getElementById('movie1-button').addEventListener('click', function() {
    mostrarAsientos(movie1); // Muestra los asientos de movie1 al hacer clic en el botón
});
document.getElementById('movie2-button').addEventListener('click', function() {
    mostrarAsientos(movie2); // Muestra los asientos de movie2 al hacer clic en el botón
});
document.getElementById('movie3-button').addEventListener('click', function() {
    mostrarAsientos(movie3); // Muestra los asientos de movie3 al hacer clic en el botón
});

// Agregar controladores de eventos para los botones de reservar y liberar asientos
document.getElementById('reservar-button').addEventListener('click', function() {
    const row = parseInt(prompt('Ingrese el número de fila:')); // Solicita el número de fila al usuario
    const seatNumber = parseInt(prompt('Ingrese el número de asiento:')); // Solicita el número de asiento al usuario
    if (!isNaN(row) && !isNaN(seatNumber) && row > 0 && seatNumber > 0 && row <= currentMovie.rows && seatNumber <= currentMovie.seatsPerRow) {
        currentMovie.reservarAsiento(row, seatNumber); // Llama a la función para reservar un asiento si los valores son válidos
    } else {
        alert('Ingrese una fila y número de asiento válidos.'); // Muestra una alerta si los valores no son válidos
    }
});

document.getElementById('liberar-button').addEventListener('click', function() {
    const row = parseInt(prompt('Ingrese el número de fila:')); // Solicita el número de fila al usuario
    const seatNumber = parseInt(prompt('Ingrese el número de asiento:')); // Solicita el número de asiento al usuario
    if (!isNaN(row) && !isNaN(seatNumber) && row > 0 && seatNumber > 0 && row <= currentMovie.rows && seatNumber <= currentMovie.seatsPerRow) {
        currentMovie.liberarAsiento(row, seatNumber); // Llama a la función para liberar un asiento si los valores son válidos
    } else {
        alert('Ingrese una fila y número de asiento válidos.'); // Muestra una alerta si los valores no son válidos
    }
});
