class Theater {
    constructor(rows, columns) {
        this.rows = rows;
        this.columns = columns;
        this.seats = [];

        // Inicializar asientos como disponibles (true)
        for (let i = 0; i < this.rows; i++) {
            this.seats[i] = Array(this.columns).fill(true);
        }
    }

    bookSeat(row, col) {
        if (row >= 0 && row < this.rows && col >= 0 && col < this.columns && this.seats[row][col]) {
            this.seats[row][col] = false;
            return true;
        }
        return false;
    }

    freeSeat(row, col) {
        if (row >= 0 && row < this.rows && col >= 0 && col < this.columns && !this.seats[row][col]) {
            this.seats[row][col] = true;
            return true;
        }
        return false;
    }
}

const theater = new Theater(5, 10); // Define el tamaño del teatro

function generateSeatTable() {
    const table = document.getElementById("seatTable");
    table.innerHTML = ""; // Limpiar la tabla antes de volver a generar

    for (let i = 0; i < theater.rows; i++) {
        const row = table.insertRow();
        for (let j = 0; j < theater.columns; j++) {
            const cell = row.insertCell();
            if (theater.seats[i][j]) {
                cell.classList.add("available");
            } else {
                cell.classList.add("occupied");
            }
        }
    }
}

function bookSeatPrompt() {
    const row = parseInt(prompt("Enter the row number:")) - 1;
    const col = parseInt(prompt("Enter the column number:")) - 1;

    if (row >= 0 && row < theater.rows && col >= 0 && col < theater.columns) {
        if (theater.seats[row][col]) {
            if (confirm(`Do you want to book the seat at Row ${row + 1}, Column ${col + 1}?`)) {
                if (theater.bookSeat(row, col)) {
                    alert("Seat booked successfully!");
                    generateSeatTable(); // Actualiza la tabla después de la reserva
                } else {
                    alert("Seat is already booked.");
                }
            }
        } else {
            alert("Seat is already booked.");
        }
    } else {
        alert("Invalid row or column number.");
    }
}

generateSeatTable(); // Genera la tabla al cargar la página
