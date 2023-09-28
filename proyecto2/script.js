/*Preguntar al usuario que pelicula quiere 
elegir en una lista de peliculas*/
var boolean = false;


document.write("<div class='container'>");
document.write("<button onclick='showSeats()' id='film1'>Pelicula 1</button>");
document.write("<button onclick='showSeats()' id='film2'>Pelicula 2</button>");
document.write("<button onclick='showSeats()' id='film3'>Pelicula 3</button>");
document.write("</div>");

document.write("<div class='container'>");
document.write("<div id='choose'>Choose</div>");
document.write("</div>");



// capturar el div para trabahar con ella
var filmButton1 = document.getElementById('film1');
var filmButton2 = document.getElementById('film2');
var filmButton3 = document.getElementById('film3');


// crear una funcion para pinchar en el cartel
function showSeats(){
    return alert('Me tocaste');
}

/* var matrix = [];
var rows = 5;
var cols = 5;
var aux = 1; */


function matrix(rows, cols){
    var aux = 1;
    document.write('<table>');
    for (i=0; i<cols; i++){
        document.write('<tr>');
        for (j=0; j<rows; j++){
            // Genera un numero aleatorio
            var numeroAleatorio = Math.floor(Math.random() * (rows * cols)) + 1;
            
            document.write('<td>'+ aux +'</td>');
            aux++;
        }
        document.write('</tr>')
    }
    document.write('</table>');
}

matrix(5,5);

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
