
var numeroCartel = prompt("¿Cuantos carteles quieres?: ");

alert("han aparecido "+ numeroCartel +" carteles");


document.write('<div id= "cartel">');
document.write('<h2>');
while (numeroCartel > 0){
    while (numeroCartel > 50){
        alert('te has pasado de carteles');
        numeroCartel = prompt("cuantos carteles quieres: ");
    }
    alert("ha entrado con exito");
    document.write('cartel ');
    numeroCartel--;
};

document.write('</h2>');
document.write('</div>');



var numeroPuerta = prompt("¿Cuantos puertas quieres?: ");

alert("han aparecido "+ numeroPuerta +" puertas");

document.write('<div id= "numeroPuerta">');
for (n=0; n < numeroPuerta; n++){
    document.write('numero de puerta ');
};
document.write('</div>');


var numeroVentana = prompt("¿Cuantos ventanas quieres?: ");

alert("han aparecido "+ numeroVentana +" ventanas");

document.write('<div id= "ventana">');
document.write('ventana');
document.write('</div>');


var colorSemaforo = prompt("¿De que color está el semaforo?: ");


document.write('<div id= "semaforo">');
if (colorSemaforo == 'rojo'){
    document.write("El semaforo está en rojo");
}else if (colorSemaforo == 'verde'){
    document.write("El semaforo está en verde");
}else if (colorSemaforo == 'naranja'){
    document.write("El semaforo está en naranja");
}else{
    alert("Como mierda el color del semaforo es "+ colorSemaforo);
};
document.write('</div>');


var numeroCoche = prompt("¿Cuantos coches quieres?: ");

alert("han aparecido "+ numeroCoche +" coches");

document.write('<div id= "coche">');
document.write('coche');
document.write('</div>');



