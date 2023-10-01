/* // crear un constructor de las salas de cine
var myCinema = function(rows, cols, nameFilms, ticketPrice,matrix){
  this.rows = rows;
  this.cols = cols;
  this.nameFilms = nameFilms;
  this.ticketPrice = ticketPrice;
  this.matrix = matrix;
} */




function myCinema(rows,cols,movieName, ticketPrice){
  this.rows = rows;
  this.cols = cols;
  this.movieName = movieName;
  this.ticketPrice = ticketPrice;
  this.seats = []; //Matriz para representar los asientos

  //Inicializar la matriz de asientos como todos libres (0)
  for (i=0; i<rows; i++){
    this.seats[i] = [];
    for (j=0; j<cols; j++){
      this.seats[i][j] = 0 // 0 representa asientos libres, 1 representa asiento ocupado
    }
  }

  // Metodo para mostrar la disponibilidad de asientos
  this.showAvailability = function(){
    console.log(`Disponibilidad de asientos para la pelicula ${this.movieName}: `);
    for(i=0; i < this.rows; i++){
      var rowStr = '';
      for(j=0; j < this.cols; j++){
        if (this.seats[i][j] === 0){
          rowStr += '0'; // 0 representa asiento libre
        }else{
          rowStr += 'X'; // X representa asientos ocupados
        }
      }
      console.log(rowStr);
    }
  };

  // Metodo para reservar un asiento
  this.reserveSeat = function(row, col){
    if (this.seats[row-1] && this.seats[row-1][col-1] === 0){
      this.seats[row-1][col-1] = 1; //Marca el asiento como ocupado
      console.log(`Asiento ${row}-${col} reservado para la pelicula ${this.movieName}.`);
      return true; // Reservacion exitosa
    }else{
      console.log(`El asiento ${row}-${col} ya está ocupado.`);
      return false; // Reservacion fallida
    }
  };

  // Método para liberar un asiento
  this.releaseSeat = function(row,col){
    if(this.seat[row - 1] && this.seats[row - 1][col - 1] === 1){
      this.seats[row - 1][col - 1] = 0; // Marcar el asiento como libre
      console.log(`Asiento ${row}-${col} no está ocupado o no existe.`);
      return false; // Liberación fallida
    }
  };
}


// Ejemplo de uso
var cinema1 = new myCinema(5,7,"Mulán",10);
cinema1.showAvailability();
cinema1.reserveSeat(2,3);
cinema1.releaseSeat(2,3) // Intentar reservar el mismo asiento nuevamente
cinema1.showAvailability();
cinema1.releaseSeat(2,3);
cinema1.showAvailability();







// Pruebas
// ...


// Lógica para generar una matriz para el número de butacas
function createMatrix(rows, cols) {
  var aux = 1;
  var matrixHTML = '<table>';
  for (var i = 0; i < cols; i++) {
    matrixHTML += '<tr>';
    for (var j = 0; j < rows; j++) {
      // Genera un número aleatorio entre 0 y 1 (0 o 1)
      var aleatorio = Math.floor(Math.random() * 2);

      // Define un umbral para pintar la celda de rojo (por ejemplo, si el número aleatorio es 1)
      if (aleatorio === 1) {
        matrixHTML += '<td class="red">' + aux + '</td>';
      } else {
        matrixHTML += '<td>' + aux + '</td>';
      }
      aux++;
    }
    matrixHTML += '</tr>';
  }
  matrixHTML += '</table>';
  return matrixHTML;
}

// crear una funcion para pinchar en el cartel
function showSeats(filmButton) {
  var matrixContainer = document.getElementById('seats');
  var matrixHTML = '';

  switch (filmButton) {
    // implementar la lógica en el caso de que elija una de estas películas
    case 'film1':
      console.log('Salida con éxito');
      matrixHTML = createMatrix(2, 2);
      break;
    case 'film2':
      console.log('Salida con éxito');
      matrixHTML = createMatrix(3, 3);
      break;
    case 'film3':
      console.log('Salida con éxito');
      matrixHTML = createMatrix(4, 4);
      break;
    default:
      console.log('Nothing');
  }

  matrixContainer.innerHTML = matrixHTML;
}
















/* var matrix = [];
var rows = 5;
var cols = 5;
var aux = 1; */


// function matrix(rows, cols){
//     var aux = 1;
//     document.write('<table>');
//     for (i=0; i<cols; i++){
//         document.write('<tr>');
//         for (j=0; j<rows; j++){
//             // Genera un numero aleatorio
//             var numeroAleatorio = Math.floor(Math.random() * (rows * cols)) + 1;
            
//             document.write('<td>'+ aux +'</td>');
//             aux++;
//         }
//         document.write('</tr>')
//     }
//     document.write('</table>');
// }

// matrix(5,5);





/* document.write("<table>");
for (i=0; i<cols ; i++){
    document.write('<tr>');
    for (j=0; j<row ; j++){
        document.write('<td>'+ (aux) +'</td>')
        aux ++;
    }
    
    document.write('</tr>');
}

document.write("</table>"); */





// capturar el div para trabahar con ella
/* var filmButton1 = document.getElementById('film1');
var filmButton2 = document.getElementById('film2');
var filmButton3 = document.getElementById('film3'); */




// Lógica para generar una matriz para el numero de butacas
/* function matrix(rows, cols) {
  var aux = 1;
  document.write('<table>');
  for (var i = 0; i < cols; i++) {
    document.write('<tr>');
    for (var j = 0; j < rows; j++) {
      // Genera un número aleatorio entre 0 y 1 (0 o 1)
      var aleatorio = Math.floor(Math.random() * 2);

      // Define un umbral para pintar la celda de rojo (por ejemplo, si el número aleatorio es 1)
      if (aleatorio === 1) {
        document.write('<td class="red">' + aux + '</td>');
      } else {
        document.write('<td>' + aux + '</td>');
      }
      aux++;
    }
    document.write('</tr>');
  }
  document.write('</table>');
}

matrix(5,5); */


/* // crear una funcion para pinchar en el cartel
function showSeats(filmButton){
  switch (filmButton){
    // implementar la logica en el caso de que elija una de estas peliculas
    case 'film1':
      console.log('Salida con exito');
      matrix(2,2);
      break;
    case 'film2':
      console.log('Salida con exito');
      matrix(3,3);
      break;
    case 'film3':
      console.log('Salida con exito');
      matrix(4,4);
      break;
    default:
      console.log('Salida con exito');
      alert('Pelicula desconocida');
  }

} */