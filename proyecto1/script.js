// enter the number of shops on screen for the user
var shopsNumber = prompt("How many stores do you want?: ");



// data validation
while (isNaN(shopsNumber) || shopsNumber <= 0 || shopsNumber > 6 || shopsNumber % 1 !== 0) {

    alert("ERROR. You must enter a positive integer and the number of stores must not exceed 6.");

    shopsNumber = prompt("How many stores do you want?: ");
}

console.log(shopsNumber);
var doorNumber = prompt("Enter the door number of the first store: ");

while (isNaN(doorNumber) || doorNumber <= 0 || doorNumber % 1 !== 0) {
    alert("ERROR. You must enter a positive integer: ");
    doorNumber = prompt("Enter the door number of the first store: ");
}

// convertimos la variable doorNumber a entero
doorNumber = parseInt(doorNumber);


// We declare the variable shopsNumberValue as an iterator to use in the following loop
var shopsNumberValue = 1;
document.write("<div class = 'container'>");
document.write("<div id= 'shops'>");

// We create this while loop so that it introduces x charts, depending on what the user requests
while (shopsNumber > 0){
    document.write("<div id='shop'>");
    var chart = prompt ("Enter the name of the chart "+ shopsNumberValue);
    document.write("<div id = 'chart'>"+chart+"</div>");
    document.write("<div id = 'doorNumber'>"+doorNumber+"</div>");
    document.write("<div class='container1'>");
    document.write("<div id = 'door'><img src='imagenes/puerta.png' alt='a door image'></div>")
    var shopWindow = prompt ("Enter the content of the shop window "+ shopsNumberValue );
    document.write("<div id = 'shopWindow'>"+shopWindow+"</div>");
    doorNumber+=2;
    shopsNumberValue++;
    
    document.write("</div>");
    document.write("</div>");
    shopsNumber--;
}


document.write("</div>");

// We create a boolean variable to use in the following loop. It is necessary
var time = false;
document.write('<div id = "clockTrafficLight">');

// In this while loop, we have a switch in which it iterates depending on what the user chooses, the specified hours
// If the user enters the time correctly, the boolean time changes to true and exits the loop
// Otherwise, ask the time again.
while (time == false){
    var clock = prompt("What time is it?, only specific hours from 1 to 12: ");
    switch (clock){
        case '1':
            document.write('<div id="clock"><img src="imagenes/horas/clock_13.jpg" alt="a clock image"></div>');
            time = true;
            break;
        case '2':
            document.write('<div id="clock"><img src="imagenes/horas/clock_14.jpg" alt="a clock image"></div>');
            time = true;
            break;
        case '3':
            document.write('<div id="clock"><img src="imagenes/horas/clock_15.jpg" alt="a clock image"></div>');
            time = true;
            break;
        case '4':
            document.write('<div id="clock"><img src="imagenes/horas/clock_16.jpg" alt="a clock image"></div>');
            time = true;
            break;
        case '5':
            document.write('<div id="clock"><img src="imagenes/horas/clock_17.jpg" alt="a clock image"></div>');
            time = true;
            break;
        case '6':
            document.write('<div id="clock"><img src="imagenes/horas/clock_18.jpg" alt="a clock image"></div>');
            time = true;
            break;
        case '7':
            document.write('<div id="clock"><img src="imagenes/horas/clock_19.jpg" alt="a clock image"></div>');
            time = true;
            break;
        case '8':
            document.write('<div id="clock"><img src="imagenes/horas/clock_20.jpg" alt="a clock image"></div>');
            time = true;
            break;
        case '9':
            document.write('<div id="clock"><img src="imagenes/horas/clock_21.jpg" alt="a clock image"></div>');
            time = true;
            break;
        case '10':
            document.write('<div id="clock"><img src="imagenes/horas/clock_22.jpg" alt="a clock image"></div>');
            time = true;
            break;
        case '11':
            document.write('<div id="clock"><img src="imagenes/horas/clock_23.jpg" alt="a clock image"></div>');
            time = true;
            break;
        case '12':
            document.write('<div id="clock"><img src="imagenes/horas/clock_12.png" alt="a clock image"></div>');
            time = true;
            break;
        default:
            alert("the variable "+ clock +" is not correct");     
    }
}



// In this part of the code it does the same as the previous loop but without using switch and substituting conditional if.
var light = false;
while(light == false){
    var trafficLight= prompt ("What colour is the traffic Light?: ");
    if (trafficLight == "red"){
        document.write('<div id="trafficLight"><img src="imagenes/luces_semaforos/luz_roja.gif" alt="a traffic light image"></div>');
        // We check with console.log that the data is correctly entered
        console.log ("The traffic light is red");
        light = true;
    }else if (trafficLight == "green"){
        document.write('<div id="trafficLight"><img src="imagenes/luces_semaforos/luz_verde.gif" alt="a traffic light image"></div>');
        console.log ("The traffic light is green");
        light = true;
    }else if (trafficLight == "yellow"){
        document.write('<div id="trafficLight"><img src="imagenes/luces_semaforos/luz_amarilla.gif" alt="a traffic light image"></div>');
        console.log("The traffic light is yellow");
        light = true;
    }else{
        alert("the traffic light color is not correct");
    }

}

document.write("</div>");







var car = prompt("How many cars do you want?: ")
document.write('<div id= cars>')

// data validation
while (car <= 0 || isNaN(car) || car % 1 !== 0){

    alert("the car variable is either not a number or is less than 0. Repeat");
    var car = prompt("How many cars do you want?: ");
}

// we use the for loop to iterate x amounts of cars
for (i = 0; i < car; i++){
    document.write('<div id="car"><img src="imagenes/coche_animado.gif" alt="a car image"></div>');
}
document.write("</div>");
document.write("</div>");
