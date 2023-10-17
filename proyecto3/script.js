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

    //Método para reservar un asiento
    reservarAsiento(fila, columna){
        if (this.asientos[fila][columna] === 'libre'){
            this.asientosReservados[fila][columna] = true;
            // Se podria considerar guardar el estado en almacenamiento local aquí
            return true;
        }else{
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
        let cantidad = 0;
        let asientosSeleccionados = [];

        for(let i = 0; i < this.filas; i++){
            for(let j = 0; j < this.columnas; j++){
                if (this.asientosReservados[i][j] || this.asientosConfirmados[i][j]){
                    cantidad ++;
                    asientosSeleccionados.push(`${i + 1}-${j + 1}`);
                }
            }
        }
        let precioTotal = cantidad * this.precioBoleto;

        return {cantidad, precioTotal, asientosSeleccionados};
    }

    // Metodo para mostrar los asientos usando DOM
    mostrarAsientos(){
        const asientoContenedor = document.getElementById('asiento-container');
        asientoContenedor.innerHTML = '';

        for (let i = 0; i < this.asientos.length; i++){
            const fila = this.asientos[i];
            const elementoFila  = document.createElement('div');
            elementoFila.className = 'fila';

            for (let j = 0; j < fila.length; j++){
                const asiento = fila[j];
                const elementoAsiento = document.createElement('div');
                elementoAsiento.textContent = asiento.number;
                if (this.asientos[i][j]){
                    elementoAsiento.classList.add('inmutable');
                }

                // Crear un ID unico para cada asiento combinando fila y columna
                const asientoId = `asiento-${i}-${j}`;
                elementoAsiento.id = asientoId;
                elementoAsiento.addEventListener('click', () => {
                    if (!asiento.inmutable){
                        if (!elementoAsiento.classList.contains('ocupado')){
                            elementoAsiento.classList.add('ocupado');
                            console.log(`Asiento seleccionado: asiento-${i}-${j}`);
                        } else {
                            elementoAsiento.classList.remove('ocupado');
                        }
                          
                    }
                    
                })

                if (asiento.reserva){
                    elementoAsiento.className = 'ocupado';
                    elementoAsiento.id = 'ocupado';
                }else{
                    elementoAsiento.className = 'libre';
                    elementoAsiento.id = 'libre';
                }
                
                elementoFila.appendChild(elementoAsiento);
            }
            asientoContenedor.appendChild(elementoFila);
        }
    }
}


// Crear tres peliculas con diferentes configuraciones de asientos
const teatro1 = new Teatro("The First Slam Dunk", 8, 10, 10);
const teatro2 = new Teatro("Saw X", 10, 12, 12);
const teatro3 = new Teatro("Avatar", 12, 15, 10);

let teatroActual = teatro1;

function mostrarAsientos(teatro){
    const asientoContenedor = document.getElementById('asiento-container');
    const costoContenedor = document.getElementById('costo-container');
    teatroActual = teatro;
    teatroActual.mostrarAsientos();
    actualizarCosto();
    asientoContenedor.style.display = 'block';
    costoContenedor.style.display = 'block';
}

function actualizarCosto(){
    const elementoCosteTotal = document.getElementById('costo-total');
    elementoCosteTotal.textContent = teatroActual.precioBoleto;
}

/* document.getElementById('asiento-container').addEventListener('click', (event) => {
    const clickedElement = event.target;
    if (clickedElement.classList.contains('libre')) {
        const asientoId = clickedElement.id;
        const [_, fila, columna] = asientoId.split('-');
        console.log(`Funciona el botón en el asiento. Fila: ${fila}, Columna: ${columna}`);
    } else if (clickedElement.classList.contains('ocupado')) {
        console.log('Este asiento está ocupado.');
    }
}); */


/* const mostrar = document.getElementById("libre");
mostrar.addEventListener('click',() =>{console.log('boton en funcion')}); */
