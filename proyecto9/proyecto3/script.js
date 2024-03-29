// Definir la clase Teatro
class Teatro{
    constructor(nombrePelicula, precioBoleto, filas, columnas){
        //Inicializamos las propiedades
        this.nombrePelicula = nombrePelicula;
        this.precioBoleto = precioBoleto;
        this.filas = filas;
        this.columnas = columnas;
        
        //Creamos una matriz de asientos aleatorios
        //Inicializamos las matrices para el seguimiento de asientos reservados y confirmados
        this.asientosReservados = Array(filas).fill().map(() => Array(columnas).fill(false));
        this.asientosConfirmados = Array(filas).fill().map(() => Array(columnas).fill(false));

        // Comprobar si los asientos ya existen en el almacenamiento local
        const guardarAsiento = localStorage.getItem('guardarAsiento');
        if(guardarAsiento){
            this.asientos = JSON.parse(guardarAsiento);
        }else{
            // Generar asientos aleatorios y guardarlos en el almacenamiento local
            this.asientos = this.generarAsientos();
            localStorage.setItem('guardarAsiento', JSON.stringify(this.asientos));
        }

    }


    // Metodo para registrar una compra
    registrarCompra(){
        const compra = this.calcularReserva(); // Obtener la informacion de la reserva
        const comprasAnteriores = JSON.parse(sessionStorage.getItem('compras')) || [];
        comprasAnteriores.push(compra);
        sessionStorage.setItem('compras', JSON.stringify(comprasAnteriores));
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
          this.asientos[fila][columna].inmutable = true; // Aqui deberia marcar los asientos como "ocupado"
          return true;
        } else {
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
                if (this.asientosReservados[i][j] && this.asientos[i][j].inmutable){
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

    quitarAsiento(fila, columna){
        if(fila >= 0 && fila < this.filas && columna >= 0 && columna < this.columnas){
            if (this.asientosReservados[fila][columna]){
                this.asientosReservados[fila][columna] = false;
                return true;
            }
        }
        return false;
    }

    // Metodo para mostrar los asientos usando DOM
    mostrarAsientos() {
        // Obtener el contenedor de asientos por su ID
        const asientoContenedor = document.getElementById('asiento-container');
        const elementoCosteTotal = document.getElementById('costo-total');
    
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

                // Verificar si el asiento esta reservado y agregar la clase 'reservado' si es el caso
                if (this.asientos[i][j]) {
                    elementoAsiento.classList.add('reserva');
                }

    
                // Crear un ID único para cada asiento basado en fila y columna
                const asientoId = `asiento-${i}-${j}`;
                elementoAsiento.id = asientoId;


                // Agregar evento onclick para reservar o liberar asientos
                elementoAsiento.onclick = () => {
                    if (!asiento.inmutable || !asiento.reserva) {
                        if (!elementoAsiento.classList.contains('en_reserva')) {
                            // Marcar el asiento como en reserva cuando se selecciona
                            elementoAsiento.classList.remove('libre');
                            elementoAsiento.classList.add('en_reserva');
                            console.log(`Asiento seleccionado: ${asiento.number}`);
                            console.log(elementoAsiento.className = 'en_reserva');
                            console.log(elementoAsiento.id = 'en_reserva');
                            this.reservarAsiento(i, j); // Llama al método reservarAsiento
                            this.actualizarCosto(elementoCosteTotal); // Actualiza el costo después de reservar
                        } else {
                            // Desmarcar el asiento cuando se hace clic nuevamente
                            elementoAsiento.classList.remove('en_reserva');
                            elementoAsiento.classList.add('libre');
                            console.log(elementoAsiento.className = 'libre');
                            console.log(elementoAsiento.id = 'libre');
                            // this.liberarAsiento(i, j); // Llama al método liberarAsiento
                            this.quitarAsiento(i, j);
                            this.actualizarCosto(elementoCosteTotal);
                        }
                    }
                };

                // Agregar evento onmouseover para mostrar un tooltip
                elementoAsiento.onmouseover = () =>{
                    // mostrar un tooltip al lado del cursor
                    const tooltip = document.createElement('div');
                    tooltip.className = 'tooltip';

                    // Definir el contenido del tooltup segun el estado del asiento
                    if (asiento.inmutable){
                        tooltip.textContent = 'Ocupado';
                    } else if (this.asientosReservados[i][j]){
                        tooltip.textContent = 'Asiento reservado';
                    } else if (asiento.reserva){
                        tooltip.textContent = 'Asiento en reserva';
                    } else {
                        tooltip.textContent = 'Asiento libre';
                    }

                    // Posicionar el tooltip al cuerpo del documento
                    document.body.appendChild(tooltip);

                    // Manejar el evento onmouseout para ocultar el tooltip
                    elementoAsiento.onmouseout = () =>{
                        tooltip.remove();
                    }
                }

                elementoAsiento.onmousedown = () => {
                    if (!asiento.inmutable || !asiento.reserva){
                        console.log('Has seleccionado un asiento libre para reservar');
                    }
                }

                elementoAsiento.onmouseup = () => {
                    if (!asiento.inmutable || !asiento.reserva) {
                        console.log('El asiento ha cambiado de estado');
                    }
                }

                
                


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

    // Metodo para actualizar el costo total
    actualizarCosto(elementoCostoTotal){
        const costoReserva = this.calcularReserva().precioTotal;
        elementoCostoTotal.textContent = costoReserva;
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
const liberarButton = document.getElementById('liberar-button');
const confirmarCompraButton = document.getElementById('confirmar-compra');

// Agregar un evento de clic al boton de confirmar compra
confirmarCompraButton.onclick = () =>{
    if(teatroActual){
        const reserva = teatroActual.calcularReserva();
        if(reserva.cantidad > 0){
            teatroActual.registrarCompra();
            console.log('Compra registrada');
            alert('Compra registrada. Gracias por su compra.');
            sessionStorage.removeItem('guardarAsiento'); // Limpia los asientos despues de la compra
            location.reload(); // Recargar la página para reiniciar
        } else {
            console.log('No se ha seleccionado ningun asiento.');
            alert ('No se ha seleccionado ningun asiento.');
        }
        
    }
}

// Agregar un evento de clic al boton "Reservar" que llama a la funcion
reservarButton.addEventListener('click', cambiarEstadoAsientos);