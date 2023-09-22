// enter the number of shops on screen for the user
var shopsNumber = parseInt(prompt("How many shops do you want?: "));


function isInt(n){
    return n%1 === 0;
}

while (shopsNumber <= 0 || !isInt(shopsNumber)){
    alert("ERROR. You must enter a positive number: ");
    shopsNumber = prompt("How many shops do you want?: ");
}

var doorNumber = parseInt(prompt("Enter the door number of the first shop: "));

while (doorNumber <= 0 || !isInt(doorNumber)){
    alert("ERROR. You must enter a positive number: ");
    doorNumber = parseInt(prompt("Enter the door number of the first shop: "));
}



var i = 1;
document.write("<div class = 'container'>");
document.write("<div id= 'shops'>");


while (shopsNumber > 0){
    document.write("<div id='shop'>");
    var chart = prompt ("Enter the name of the chart "+ i);
    document.write("<div id = 'chart'>"+chart+"</div>");
    document.write("<div id = 'doorNumber'>"+doorNumber+"</div>");
    document.write("<div class='container1'>");
    document.write("<div id = 'door'><img src='imagenes/puerta.png' alt='a door image'></div>")
    var shopWindow = prompt ("Enter the content of the shop window "+ i);
    document.write("<div id = 'shopWindow'>"+shopWindow+"</div>");
    doorNumber+=2;
    i++;
    
    document.write("</div>");
    document.write("</div>");
    shopsNumber--;
}


document.write("</div>");

var clock = prompt("What time is it?, only specific hours from 1 to 12: ");
document.write('<div id = "clockTrafficLight">');

if (clock < 0 || clock > 13){
    while (clock < 0 || clock > 13){
        alert("the variable "+ clock +" is not correct");
        var clock = prompt("What time is it?, only specific hours from 1 to 12: ");
    }
}

switch (clock){
    case '1':
        document.write('<div id="clock"><img src="imagenes/horas/clock_13.jpg" alt="a clock image"></div>');
        break;
    case '2':
        document.write('<div id="clock"><img src="imagenes/horas/clock_14.jpg" alt="a clock image"></div>');
        break;
    case '3':
        document.write('<div id="clock"><img src="imagenes/horas/clock_15.jpg" alt="a clock image"></div>');
        break;
    case '4':
        document.write('<div id="clock"><img src="imagenes/horas/clock_16.jpg" alt="a clock image"></div>');
        break;
    case '5':
        document.write('<div id="clock"><img src="imagenes/horas/clock_17.jpg" alt="a clock image"></div>');
        break;
    case '6':
        document.write('<div id="clock"><img src="imagenes/horas/clock_18.jpg" alt="a clock image"></div>');
        break;
    case '7':
        document.write('<div id="clock"><img src="imagenes/horas/clock_19.jpg" alt="a clock image"></div>');
        break;
    case '8':
        document.write('<div id="clock"><img src="imagenes/horas/clock_20.jpg" alt="a clock image"></div>');
        break;
    case '9':
        document.write('<div id="clock"><img src="imagenes/horas/clock_21.jpg" alt="a clock image"></div>');
        break;
    case '10':
        document.write('<div id="clock"><img src="imagenes/horas/clock_22.jpg" alt="a clock image"></div>');
        break;
    case '11':
        document.write('<div id="clock"><img src="imagenes/horas/clock_23.jpg" alt="a clock image"></div>');
        break;
    case '12':
        document.write('<div id="clock"><img src="imagenes/horas/clock_12.png" alt="a clock image"></div>');
        break;
    default:
        break;
}

var trafficLight= prompt ("What colour is the traffic Light?: ");

while (trafficLight != "red" && trafficLight != "green" && trafficLight != "yellow"){
    alert("the traffic light color is not correct");
    var trafficLight= prompt ("What colour is the traffic Light?: ");
}
console.log ("successful exit");

if (trafficLight == "red"){
    document.write('<div id="trafficLight"><img src="imagenes/luces_semaforos/luz_roja.gif" alt="a traffic light image"></div>');
    console.log ("The traffic light is red");
}else if (trafficLight == "green"){
    document.write('<div id="trafficLight"><img src="imagenes/luces_semaforos/luz_verde.gif" alt="a traffic light image"></div>');
    console.log ("The traffic light is green");
}else if (trafficLight == "yellow"){
    document.write('<div id="trafficLight"><img src="imagenes/luces_semaforos/luz_amarilla.gif" alt="a traffic light image"></div>');
    console.log("The traffic light is yellow");
};


var car = prompt("How many cars do you want?: ")
document.write('<div id= cars>')

while (car < 0 || !isInt(car)){
    if (car < 0){
        alert("the car variable is either not a number or is less than 0. Repeat");
    };
    var car = prompt("How many cars do you want?: ");
}

for (i = 0; i < car; i++){
    document.write('<div id="car"><img src="imagenes/coche_animado.gif" alt="a car image"></div>')
}
document.write("</div>");
document.write("</div>");
document.write("</div>");
























/* // Aqui traajamos con los carteles
var numeroCartel = prompt("¿Cuantos carteles quieres?: ");


document.write("<div class= 'container'>");
document.write("<div id='carteles'>")
while (numeroCartel > 0){
    while (numeroCartel > 50){
        alert('te has pasado de carteles');
        numeroCartel = prompt("cuantos carteles quieres: ");
    }
    document.write('<div id= "cartel">');
    document.write('<img src="imagenes/cartel2.png" alt="imagen de un cartel">');
    document.write('</div>');
    numeroCartel--;
};
document.write('</div>');



// Aqui trabajamos con las puertas y el numero de dichas puertas
var numeroPuerta = prompt("¿Cuantos puertas quieres?: ");

document.write("<div id= 'numeroPuertas'>");

for (n=0; n < numeroPuerta; n++){
    document.write('<div id= "numeroPuerta">');
    document.write('<img src="imagenes/numero_puerta.png" alt="imagen del numero de la puerta">');
    document.write("<div id = 'container'>");
    document.write('<img src="imagenes/puerta.png" alt="imagen del numero de la puerta">');
    document.write('<div id= "ventana">OFERTA</div>');
    document.write("</div>");
    document.write('</div>');
};

document.write('</div>');



// Aqui trabajamos con los relojes y los semaforos y el manejo de sus colores
var numeroRelojSemaforo = prompt("¿Cauntos relojes y semaforos quieres?: ");
var colorSemaforo = prompt("¿De que color está el semaforo?: ");

document.write('<div id= "semaforos">');

if (colorSemaforo == 'rojo'){
    console.log("El semaforo está en rojo");
}else if (colorSemaforo == 'verde'){
    console.log("El semaforo está en verde");
}else if (colorSemaforo == 'naranja'){
    console.log("El semaforo está en naranja");
}else{
    alert("La variable "+ colorSemaforo +" no se asemeja al color de un semaforo");
};
for (i = 0; i < numeroRelojSemaforo; i++){
    document.write('<div id= "semaforo">');
    document.write('<img src="imagenes/reloj.png" alt="imagen de un reloj">');
    document.write('<img src="imagenes/semaforo_animado.gif" alt="imagen de un semaforo">');
    document.write('</div>');
}
document.write('</div>');



// Aqui trabajamos con los coches
var numeroCoche = prompt("¿Cuantos coches quieres?: ");
document.write('<div id= "coches">');

while (numeroCoche > 0){
    document.write('<div id= "coche">');
    document.write('<img src="imagenes/coche_animado.gif" alt="imagen de un coche">');
    document.write('</div>');
    numeroCoche --;
}
document.write('</div>');
document.write("</div>");



 */