// Definir la clase Teatro
class Teatro{
    constructor(nombrePelicula, precioBoleto, filas, columnas){
        //Inicializamos las propiedades
        this.nombrePelicula = nombrePelicula;
        this.precioBoleto = precioBoleto;
        this.filas = filas;
        this.columnas = columnas;
        
        //Creamos una matriz de asientos aleatorios
        //this.asientos = Array(filas).fill().map(() => Array(columnas).fill().map(() => Math.random() < 0.5 ? 'libre' : 'ocupado'));
        this.asientos = this.generarAsientos();
        //Inicializamos las matrices para el seguimiento de asientos reservados y confirmados
        this.asientosReservados = Array(filas).fill().map(() => Array(columnas).fill(false));
        this.asientosConfirmados = Array(filas).fill().map(() => Array(columnas).fill(false));

    }

    //Creacion de metodos de la clase

    generarAsientos(){
        const asiento = [];

        for (let i = 1; i <= this.filas; i++){
            const fila = [];

            for (let j = 1; j <= this.columnas; j++){
                const reservado = Math.random() < 0.5;
                fila.push({number: j, reserva: reservado, inmutable: reservado});
            }

            asiento.push(fila);
        }

        return asiento;
    }



     // Método para reservar un asiento
    reservarAsiento(fila, columna) {
        if (!this.asientosReservados[fila][columna] && !this.asientosConfirmados[fila][columna] && this.asientos[fila][columna].inmutable === false) {
          this.asientosReservados[fila][columna] = true;
          // Se podría considerar guardar el estado en almacenamiento local aquí
          return true;
        } else {
          return false;
        }
    }

    // Método para lberar un asiento previamente confirmado
    liberarAsiento(fila,columna){
        if (this.asientosConfirmados[fila][columna]){
            this.asientosConfirmados[fila][columna] = false;
            return true;
        }else{
            return false;
        }
    }



    // Método para calcular el total de la reserva y los asientos seleccionados
    calcularReserva(){
        let cantidad = 0;  // Inicializamos la cantidad en 0

        // Crear un array para almacenar las ubicaciones de los asientos seleccionados
        let asientosSeleccionados = [];


        // Recorre todas las filas de asientos
        for(let i = 0; i < this.filas; i++){
            // Recorre todas las columnas de asientos en cada fila
            for(let j = 0; j < this.columnas; j++){
                // Verifica si un asiento está reservado
                if (this.asientosReservados[i][j]){
                    cantidad ++; // Incrementa la cantidad por cada asiento reservado
                    // Agrega la ubicación del asiento (fila y columna) al array de asientos seleccionados
                    asientosSeleccionados.push(`${i + 1}-${j + 1}`);
                }
                
            }
        }

        // Calcula el precio total multiplicando la cantidad de asientos por el precio del boleto
        let precioTotal = cantidad * this.precioBoleto;

        // Retorna un objeto con la cantidad de asientos seleccionados, el precio total y la lista de asientos seleccionados
        return {cantidad, precioTotal, asientosSeleccionados};
    }

    // Metodo para mostrar los asientos usando DOM
    mostrarAsientos() {
        // Obtener el contenedor de asientos por su ID
        const asientoContenedor = document.getElementById('asiento-container');
    
        // Limpiar cualquier contenido existente en el contenedor
        asientoContenedor.innerHTML = '';
    
        // Recorriendo cada fila de asientos
        for (let i = 0; i < this.asientos.length; i++) {
            // Obtener la fila actual
            const fila = this.asientos[i];
            
            // Crear un elemento div para representar una fila
            const elementoFila = document.createElement('div');
            elementoFila.className = 'fila';
    
            // Recorriendo los asientos en la fila actual
            for (let j = 0; j < fila.length; j++) {
                // Obtener el asiento actual
                const asiento = fila[j];
    
                // Crear un elemento div para representar un asiento
                const elementoAsiento = document.createElement('div');
    
                // Establecer el número del asiento como contenido de texto
                elementoAsiento.textContent = asiento.number;
    
                // Verificar si el asiento es inmutable y agregar la clase 'inmutable' si es el caso
                if (this.asientos[i][j]) {
                    elementoAsiento.classList.add('inmutable');
                }
    
                // Crear un ID único para cada asiento basado en fila y columna
                const asientoId = `asiento-${i}-${j}`;
                elementoAsiento.id = asientoId;

                
    
                // Agregar un evento de clic al asiento
                elementoAsiento.addEventListener('click', () => {
                    if (!asiento.inmutable) {
                        if (!elementoAsiento.classList.contains('en_reserva')) {
                            // Marcar el asiento como en reserva cuando se selecciona
                            elementoAsiento.classList.remove('libre');
                            elementoAsiento.classList.add('en_reserva');
                            console.log(`Asiento seleccionado: ${asientoId}`);
                            console.log(elementoAsiento.className = 'en_reserva');
                            console.log(elementoAsiento.id = 'en_reserva');
                            this.reservarAsiento(i,j); // Llama al metodo reservarAsiento
                            actualizarCosto(); // actualiza el costo despues de reservar
                        } else {
                            // Desmarcar el asiento cuando se hace clic nuevamente
                            elementoAsiento.classList.remove('en_reserva');
                            elementoAsiento.classList.add('libre');
                            console.log(elementoAsiento.className = 'libre');
                            console.log(elementoAsiento.id = 'libre');
                            this.liberarAsiento(i,j); // Llama al método liberarAsiento
                            actualizarCosto();
                        }
                    }
                });
                
                /* // Consultar el estado de los asientos en las matrices
                if(this.asientosReservados[i][j]){
                    console.log(elementoAsiento.className = 'en_reserva');
                    console.log(elementoAsiento.id = 'en_reserva');
                } else if (this.asientosConfirmados[i][j]){
                    console.log(elementoAsiento.className = 'reservado');
                    console.log(elementoAsiento.id = 'reservado');
                } else {
                    console.log(elementoAsiento.className = 'libre');
                    console.log(elementoAsiento.id = 'libre');
                } */


                // Verificar si el asiento está reservado y asignar la clase y el ID correspondientes
                if (asiento.reserva) {
                    elementoAsiento.className = 'ocupado';
                    elementoAsiento.id = 'ocupado';
                } else {
                    elementoAsiento.className = 'libre';
                    elementoAsiento.id = 'libre';
                }
    
                // Agregar el elemento del asiento al elemento de fila
                elementoFila.appendChild(elementoAsiento);
            }
    
            // Agregar la fila completa al contenedor de asientos
            asientoContenedor.appendChild(elementoFila);
        }
    }
}


// Crear tres peliculas con diferentes configuraciones de asientos
const teatro1 = new Teatro("The First Slam Dunk", 8, 10, 10);
const teatro2 = new Teatro("Saw X", 10, 12, 12);
const teatro3 = new Teatro("Avatar", 12, 15, 10);

let teatroActual;

function mostrarAsientos(teatro){
    const asientoContenedor = document.getElementById('asiento-container');
    const costoContenedor = document.getElementById('costo-container');
    teatroActual = teatro;
    teatroActual.mostrarAsientos();
    cambiarEstadoAsientos();
    actualizarCosto();
    asientoContenedor.style.display = 'block';
    costoContenedor.style.display = 'block';
}

// Funcion para actualizar el costo total
function actualizarCosto(){
    const elementoCosteTotal = document.getElementById('costo-total');
    const costoReserva = teatroActual.calcularReserva().precioTotal;
    elementoCosteTotal.textContent = costoReserva;
}




// Funcion para cambiar el estado del asiento de "en_reserva" a "ocupado"
function cambiarEstadoAsientos(){
    // obtener todos los elementos con la clase "en_reserva"
    const asientoEnReserva = document.querySelectorAll('.en_reserva');

    // Cambia la clase de "en_reserva" a "ocupado" para cada asiento en reserva
    for (let i= 0; i < asientoEnReserva.length; i++){
        asientoEnReserva[i].classList.add('reservado');
        asientoEnReserva[i].classList.remove('en_reserva');
    }

    // Actualizar el costo total
    actualizarCosto();
}

// obtener una referencia al boton "Reservar" por su ID
const reservarButton = document.getElementById('reservar-button');

// Agregar un evento de clic al boton "Reservar" que llama a la funcion
reservarButton.addEventListener('click', cambiarEstadoAsientos);