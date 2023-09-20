
var numeroCartel = prompt("¿Cuantos carteles quieres?: ");



document.write('<div id= "cartel">');
document.write('<h2>');
while (numeroCartel > 0){
    while (numeroCartel > 50){
        alert('te has pasado de carteles');
        numeroCartel = prompt("cuantos carteles quieres: ");
    }
    document.write('cartel ');
    numeroCartel--;
};

document.write('</h2>');
document.write('</div>');



var numeroPuerta = prompt("¿Cuantos puertas quieres?: ");


document.write('<div id= "numeroPuerta">');
for (n=0; n < numeroPuerta; n++){
    document.write('numero de puerta ');
};
document.write('</div>');


var numeroVentana = prompt("¿Cuantos ventanas quieres?: ");


document.write('<div id= "ventana">');
document.write('ventana');
document.write('</div>');


var colorSemaforo = prompt("¿De que color está el semaforo?: ");


document.write('<div id= "semaforo">');
if (colorSemaforo == 'rojo'){
    console.log("El semaforo está en rojo");
    document.write("rojo");
}else if (colorSemaforo == 'verde'){
    console.log("El semaforo está en verde");
    document.write("verde");
}else if (colorSemaforo == 'naranja'){
    console.log("El semaforo está en naranja");
    document.write("naranja");
}else{
    alert("Como mierda el color del semaforo es "+ colorSemaforo);
};
document.write('</div>');


var numeroCoche = prompt("¿Cuantos coches quieres?: ");

document.write('<div id= "coche">');
document.write('coche');
document.write('</div>');



