class Teatro{
  constructor(nombrePelicula, precioBoleto, filas, columnas){
    this.nombrePelicula = nombrePelicula;
    this.precioBoleto = precioBoleto;
    this.filas = filas;
    this.columnas = columnas;
    this.asientos = Array(filas).fill().map(() => Array(columnas).fill().map(() => Math.random() < 0.5 ? 'O' : 'X'));
    this.asientosReservados = Array(filas).fill().map(() => Array(columnas).fill(false));
    this.asientosConfirmados = Array(filas).fill().map(() => Array(columnas).fill(false));


    
  }

  reservarAsiento(fila, columna){
    // Si el asiento está libre
    if (this.asientos[fila][columna] === "O"){
        // Marcamos el asiento como ocupado
        this.asientosReservados[fila][columna] = true;
        // Guarda el estado en el almacenamiento local
        return true;
    } else {
        // Si el asiento ya está ocupado devolvemos false
        return false;
    }
  }

  liberarAsiento(fila, columna){
    if (this.asientosConfirmados[fila][columna]){
        this.asientosConfirmados[fila][columna] = false;
        return true;
    }else{
        return false;
    }
  }

  calcularReserva() {
    let cantidad = 0;
    let asientosSeleccionados = [];
    for (let i = 0; i < this.filas; i++) {
        for (let j = 0; j < this.columnas; j++) {
            if (this.asientosReservados[i][j] || this.asientosConfirmados[i][j]) {
                cantidad++;
                asientosSeleccionados.push(`${i + 1}-${j + 1}`);
            }
        }
    }
    let precioTotal = cantidad * this.precioBoleto;
    return {cantidad, precioTotal, asientosSeleccionados};
  }

  mostrarAsientos() {
    document.open();
    document.write('<link rel="stylesheet" href="/proyecto2/style.css">');
    document.write('<table>');
    for (let i = 0; i < this.filas; i++) {
        document.write('<tr>');
        for (let j = 0; j < this.columnas; j++) {
            let clase = '';
            if (this.asientos[i][j] === 'X' && !this.asientosReservados[i][j]) {
                clase = 'ocupado';
            } else if (this.asientosReservados[i][j]) {
                clase = 'reservado';
            } else if (this.asientosConfirmados[i][j]) {
                clase = 'ocupado';
            } else {
              clase = 'libre';
            }
            document.write(`<td class="${clase}">${i + 1}-${j + 1}</td>`);
        }
        document.write('</tr>');
    }
    document.write('</table>');
    document.write("<div class = 'botones'>")
    document.write('<button onclick="reservarAsiento()">Reservar Asiento</button>');
    document.write('<button onclick="confirmarReserva()">Confirmar Reserva</button>');
    document.write('<button onclick="liberarAsiento()">Liberar Asiento</button>');
    document.write('<button onclick="mostrarReserva()">Mostrar Reserva</button>');
    document.write("</div>")
    document.close();
  }

  confirmarReserva() {
    let asientosReservados = [];
    for (let i = 0; i < this.filas; i++) {
        for (let j = 0; j < this.columnas; j++) {
            if (this.asientosReservados[i][j]) {
                asientosReservados.push(`${i + 1}-${j + 1}`);
            }
        }
    }
    if (asientosReservados.length > 0) {
        let confirmacion = confirm(`Estás a punto de reservar los siguientes asientos: ${asientosReservados.join(', ')}. ¿Deseas continuar?`);
        if (confirmacion) {
            for (let i = 0; i < this.filas; i++) {
                for (let j = 0; j < this.columnas; j++) {
                    if (this.asientosReservados[i][j]) {
                        this.asientosConfirmados[i][j] = true;
                        this.asientosReservados[i][j] = false;
                    }
                }
            }
            alert('Tu reserva ha sido confirmada. Gracias por elegir nuestro teatro.');
        } else {
            alert('Tu reserva no ha sido confirmada. Puedes seguir seleccionando asientos.');
        }
    } else {
        alert('No has reservado ningún asiento.');
    }
    this.mostrarAsientos();
  }

}








/* let peliculaElegida = prompt('Elige una pelicula: \n1. Pelicula 1\n2. Pelicula 2\n3. Pelicula 3');
let teatroElegido;

switch(peliculaElegida){
  case '1':
    teatroElegido = teatro1;
    break;
  case '2':
    teatroElegido = teatro2;
    break;
  case '3':
    teatroElegido = teatro3;
    break;
  default:
    alert('Opción no válida');

} */