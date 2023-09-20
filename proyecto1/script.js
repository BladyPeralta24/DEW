// Aqui traajamos con los carteles
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
    document.write("<div>");
    document.write('<img src="imagenes/puerta.png" alt="imagen del numero de la puerta">');
    document.write("</div>");
    document.write('</div>');
};

document.write('</div>');



// Aqui trabajamos con las ventanas de los escaparates
var numeroVentana = prompt("¿Cuantos ventanas quieres?: ");

document.write("<div id= 'ventanas'>");

while (numeroVentana > 0){
    document.write('<div id= "ventana">');
    document.write('<img src="imagenes/ventana_animada.gif" alt="imagen de un escaparate">');
    document.write('</div>');
    numeroVentana --;
}
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



