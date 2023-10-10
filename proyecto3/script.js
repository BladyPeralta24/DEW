// Definir la clase Teatro
class Teatro{
    constructor(nombrePelicula, precioBoleto, filas, columnas){
        //Inicializamos las propiedades
        this.nombrePelicula = nombrePelicula;
        this.precioBoleto = precioBoleto;
        this.filas = filas;
        this.columnas = columnas;

        //Creamos una matriz de asientos aleatorios
        this.asientos = Array(filas).fill().map(() => Array(columnas).fill().map(() => Math.random() < 0.5 ? 'libre' : 'ocupado'));

        //Inicializamos las matrices para el seguimiento de asientos reservados y confirmados
        this.asientosReservados = Array(filas).fill().map(() => Array(columnas).fill(false));
        this.asientosConfirmados = Array(filas).fill().map(() => Array(columnas).fill(false));
    }

    //Creacion de metodos de la clase

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
        document.open();
        
    }






}
