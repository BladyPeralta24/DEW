// script.js

// Objeto que representa una sala de cine
function SalaCine(filas, columnas, pelicula, precioEntrada) {
    this.filas = filas;
    this.columnas = columnas;
    this.pelicula = pelicula;
    this.precioEntrada = precioEntrada;
    this.asientos = [];

    // Inicializar la matriz de asientos (todos libres al principio)
    for (let i = 0; i < filas; i++) {
        this.asientos[i] = [];
        for (let j = 0; j < columnas; j++) {
            this.asientos[i][j] = true; // true significa libre
        }
    }

    // Método para reservar un asiento
    this.reservarAsiento = function (fila, columna) {
        if (fila >= 0 && fila < filas && columna >= 0 && columna < columnas) {
            if (this.asientos[fila][columna]) {
                this.asientos[fila][columna] = false; // false significa ocupado
                return true; // Reserva exitosa
            } else {
                return false; // El asiento ya está ocupado
            }
        } else {
            return false; // Asiento inválido
        }
    };

    // Método para liberar un asiento
    this.liberarAsiento = function (fila, columna) {
        if (fila >= 0 && fila < filas && columna >= 0 && columna < columnas) {
            this.asientos[fila][columna] = true; // true significa libre
            return true; // Liberación exitosa
        } else {
            return false; // Asiento inválido
        }
    };
}

// Ejemplo de uso
const sala1 = new SalaCine(5, 6, "Pelicula 1", 10.0);
const sala2 = new SalaCine(4, 8, "Pelicula 2", 12.0);
const sala3 = new SalaCine(6, 7, "Pelicula 3", 8.0);

// Aquí debes agregar la lógica para que el usuario interactúe con la página y haga reservas

function mostrarPeliculas() {
    const peliculaSeleccionada = prompt("Elija una película: \n1. Pelicula 1\n2. Pelicula 2\n3. Pelicula 3");

    switch (peliculaSeleccionada) {
        case "1":
            mostrarSala(sala1);
            break;
        case "2":
            mostrarSala(sala2);
            break;
        case "3":
            mostrarSala(sala3);
            break;
        case null:
            alert("Has cancelado la seleccion.");
            break;
        default:
            alert("Selección no válida");
            mostrarPeliculas(); // Vuelve a mostrar las películas
            break;
    }
}






function mostrarSala(sala) {
    const salaDiv = document.getElementById("sala");
    salaDiv.innerHTML = `<h2>Sala de Cine - ${sala.pelicula}</h2>`;

    for (let i = 0; i < sala.filas; i++) {
        for (let j = 0; j < sala.columnas; j++) {
            const asiento = sala.asientos[i][j] ? "green" : "red"; // Color según disponibilidad
            salaDiv.innerHTML += `<div class="asiento" style="background-color: ${asiento}"></div>`;
        }
        salaDiv.innerHTML += "<br>";
    }

    const fila = parseInt(prompt("Ingrese el número de fila deseado:"));
    const columna = parseInt(prompt("Ingrese el número de columna deseado:"));

    if (sala.reservarAsiento(fila, columna)) {
        alert(`¡Reserva exitosa! El precio total es: ${sala.precioEntrada}€`);
    } else {
        alert("El asiento seleccionado no está disponible o es inválido.");
    }

    const continuar = confirm("¿Desea realizar otra reserva?");
    if (continuar) {
        mostrarPeliculas(); // Vuelve a mostrar las películas
    } else {
        alert("¡Gracias por reservar con nosotros!");
    }
}

// Iniciar la aplicación mostrando las películas disponibles
mostrarPeliculas();

