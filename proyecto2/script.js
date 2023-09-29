// crear un constructor de las salas de cine
var myCinema = function(rows, cols, nameFilms, ticketPrice,matrix){
  this.rows = rows;
  this.cols = cols;
  this.nameFilms = nameFilms;
  this.ticketPrice = ticketPrice;
  this.matrix = matrix;
}



// capturar el div para trabahar con ella
var filmButton1 = document.getElementById('film1');
var filmButton2 = document.getElementById('film2');
var filmButton3 = document.getElementById('film3');




// crear una funcion para pinchar en el cartel
function showSeats(filmButton){
  switch (filmButton){
    // implementar la logica en el caso de que elija una de estas peliculas
    case 'film1':
      console.log('Salida con exito');
      alert('Has elegido la pelicula 1');
      break;
    case 'film2':
      console.log('Salida con exito');
      alert('Has elegido la pelicula 2');
      break;
    case 'film3':
      console.log('Salida con exito');
      alert('Has elegido la pelicula 3');
      break;
    default:
      console.log('Salida con exito');
      alert('Pelicula desconocida');
  }

}







// Declarar un objeto para el cine
var myCinema = new Object();
myCinema.rows = 0;
myCinema.cols = 0;
myCinema.nameFilms = "";
myCinema.ticketPrice = "";
myCinema.matrix = [];






// Lógica para generar una matriz para el numero de butacas
function matrix(rows, cols) {
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

matrix(10,5);





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