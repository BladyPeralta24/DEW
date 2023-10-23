// Definición de la clase Teatro
class Teatro {
  constructor(nombrePelicula, precioBoleto, filas, columnas) {
    // Inicialización de propiedades
    this.nombrePelicula = nombrePelicula;
    this.precioBoleto = precioBoleto;
    this.filas = filas;
    this.columnas = columnas;
    
    // Creación de una matriz de asientos aleatorios
    this.asientos = Array(filas).fill().map(() => Array(columnas).fill().map(() => Math.random() < 0.5 ? 'O' : 'X'));
    
    // Inicialización de matrices para seguimiento de asientos reservados y confirmados
    this.asientosReservados = Array(filas).fill().map(() => Array(columnas).fill(false));
    this.asientosConfirmados = Array(filas).fill().map(() => Array(columnas).fill(false));
  }

  // Método para reservar un asiento
  reservarAsiento(fila, columna) {
    if (this.asientos[fila][columna] === "O") {
      this.asientosReservados[fila][columna] = true;
      // Se podría considerar guardar el estado en almacenamiento local aquí
      return true;
    } else {
      return false;
    }
  }

  // Método para liberar un asiento previamente confirmado
  liberarAsiento(fila, columna) {
    if (this.asientosConfirmados[fila][columna]) {
      this.asientosConfirmados[fila][columna] = false;
      return true;
    } else {
      return false;
    }
  }

  // Método para calcular el total de la reserva y los asientos seleccionados
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
    return { cantidad, precioTotal, asientosSeleccionados };
  }

  // Método para mostrar los asientos en una tabla HTML
  mostrarAsientos() {
    // Inicia la construcción del documento HTML
    document.open();
    document.write('<link rel="stylesheet" href="/DEW/proyecto2/style.css">');
    document.write('<table>');

    // Itera sobre las filas y columnas de asientos
    for (let i = 0; i < this.filas; i++) {
      document.write('<tr>');

      for (let j = 0; j < this.columnas; j++) {
        let clase = '';

        // Determina la clase CSS para cada asiento
        if (this.asientos[i][j] === 'X' && !this.asientosReservados[i][j]) {
          clase = 'ocupado';
        } else if (this.asientosReservados[i][j]) {
          clase = 'reservado';
        } else if (this.asientosConfirmados[i][j]) {
          clase = 'ocupado';
        } else {
          clase = 'libre';
        }

        // Agrega el asiento a la tabla con la clase CSS correspondiente
        document.write(`<td class="${clase}">${i + 1}-${j + 1}</td>`);
      }

      document.write('</tr>');
    }

    // Agrega botones al final de la tabla
    document.write('</table>');
    document.write("<div class='botones'>");
    document.write('<button onclick="reservarAsiento()">Reservar Asiento</button>');
    document.write('<button onclick="confirmarReserva()">Confirmar Reserva</button>');
    document.write('<button onclick="liberarAsiento()">Liberar Asiento</button>');
    document.write('<button onclick="mostrarReserva()">Mostrar Reserva</button>');
    document.write('</div>');
    
    // Cierra el documento HTML
    document.close();
  }

  // Método para confirmar la reserva de asientos previamente reservados
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

    // Vuelve a mostrar la tabla de asientos actualizada
    this.mostrarAsientos();
  }
}
