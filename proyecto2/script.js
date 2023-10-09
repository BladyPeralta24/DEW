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






























// // Crear un Objeto con su respetivo constructor

// function myCinema(rows,cols,movieName, ticketPrice, seatsHTML){
//   // Propiedades del objeto
//   this.rows = rows;
//   this.cols = cols;
//   this.movieName = movieName;
//   this.ticketPrice = ticketPrice;
//   this.seatsHTML = seatsHTML; //Matriz para representar los asientos en HTML

//   // Metodo para reservar un asiento
//   //this.bookingSeat = function (row,col){
//     // Agregar logica de reserva aqui
//     /* si la casilla esta en blanco, entonces:*/
//   //};
// }



// var film1 = new myCinema(10,10,"THE FIRST SLAM DUNK", 7);
// var film2 = new myCinema(10,12, "SAW X", 8);
// var film3 = new myCinema(10,14, "AVATAR", 9);




// function bookingSeat(){
//   if (list.includes(reserveSeat)){
//     console.log("el numero esta en la lista");
//   }else{
//     console.log("para ná");
//   }
// }


// // Lógica para generar una matriz para el número de butacas
// function createMatrix(rows, cols) {
//   //var aux = 1;
//   var matrix = [];
//   var matrixHTML = '<table>';
//   for (var i = 0; i < cols; i++) {
//     matrixHTML += '<tr>';
//     matrix[i] = []; 
//     for (var j = 0; j < rows; j++) {
//       // Genera un número aleatorio entre 0 y 1 (0 o 1)
//       var aleatorio = Math.floor(Math.random() * 2);
      

//       // Define un umbral para pintar la celda de rojo (por ejemplo, si el número aleatorio es 1)
//       if (aleatorio === 1) {
//         matrixHTML += '<td class="red">' + i+j + '</td>';
//         matrix[i][j] = 1;
//       } else {
//         matrixHTML += '<td class="green">' + i+j + '</td>';
//         matrix[i][j] = 0;
//       }
//       // aux++;
//     }
//     matrixHTML += '</tr>';
//   }
//   matrixHTML += '</table>';
//   return matrixHTML;
// }




// function buySeats(){
//   var boolean = false;
//   while (boolean == false){
//     var reserveSeat = prompt("Select a seat to reserve: ");

//     // validar datos
//     while (isNaN(reserveSeat) || reserveSeat < 0 || reserveSeat % 1 !== 0){
//       alert ("ERROR. You must enter a positive.");
//       reserveSeat = prompt("Select a seat to reserve: ");
//       if (!isNaN(reserveSeat)){
//         reserveSeat = Number.isInteger(reserveSeat);
//       }else{
//         break;
//       }
//     }
//     console.log(reserveSeat);

//     var repeat = confirm("Do you want to continue Shopping");

//     if (repeat === true){
//       console.log("Continuar");
//     }else{
//       console.log("Cancelar");
//       boolean = true;
//     }
//   }
//   return reserveSeat;
// }




// // crear una funcion para pinchar en el cartel
// function showSeats(filmButton) {
//   var matrixContainer = document.getElementById('seats');


//   switch (filmButton) {
//     // implementar la lógica en el caso de que elija una de estas películas
//     case 'film1':
//       console.log('Salida con éxito');
//       var seatsHTML = createMatrix(film1.rows,film1.cols);
//       break;
//       case 'film2':
//         console.log('Salida con éxito');
//       var seatsHTML = createMatrix(film2.rows,film2.cols);
//       break;
//     case 'film3':
//       console.log('Salida con éxito');
//       var seatsHTML = createMatrix(film3.rows,film3.cols);
//       break;
//     default:
//         console.log('Nothing');
//       }

//       matrixContainer.innerHTML = seatsHTML;
//       var buyButton = document.createElement("button");
//       buyButton.textContent = "Buy seats";
//       buyButton.onclick = function(){
//         buySeats();
//       };
//       var buyContainer = document.getElementById('buy');
//       buyContainer.innerHTML = "";
//       buyContainer.appendChild(buyButton);
//       // document.write("<button class='buttonBuy' onclick='buySeats()'>Buy</button>");
  
// }


// createMatrix(film1.rows, film1.cols);
// createMatrix(film2.rows, film2.cols);
// createMatrix(film3.rows, film3.cols);