


// Crear un Objeto con su respetivo constructor

function myCinema(rows,cols,movieName, ticketPrice, seatsHTML){
  // Propiedades del objeto
  this.rows = rows;
  this.cols = cols;
  this.movieName = movieName;
  this.ticketPrice = ticketPrice;
  this.seatsHTML = seatsHTML; //Matriz para representar los asientos en HTML

  // Metodo para reservar un asiento
  this.reserveSeat = function (row,col){
    // Agregar logica de reserva aqui
  };
}



var film1 = new myCinema(10,10,"THE FIRST SLAM DUNK", 7);
var film2 = new myCinema(10,12, "SAW X", 8);
var film3 = new myCinema(10,14, "AVATAR", 9);




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
      var seatsHTML = createMatrix(film1.rows,film1.cols);
      matrixHTML = seatsHTML;
      break;
    case 'film2':
      console.log('Salida con éxito');
      var seatsHTML = createMatrix(film2.rows,film2.cols);
      matrixHTML = seatsHTML;
      break;
    case 'film3':
      console.log('Salida con éxito');
      var seatsHTML = createMatrix(film3.rows,film3.cols);
      matrixHTML = seatsHTML;
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