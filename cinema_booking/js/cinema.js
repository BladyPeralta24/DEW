class Theater {
    constructor(rows, columns, filmName, ticketPrice) {
      this.rows = rows;
      this.columns = columns;
      this.filmName = filmName;
      this.ticketPrice = ticketPrice;
      this.seats = [];
  
      // Inicializar asientos como disponibles (true)
      for (let i = 0; i < this.rows; i++) {
        this.seats[i] = Array(this.columns).fill(true);
      }
    }
  
    bookSeat(row, col) {
      if (this.seats[row][col]) {
        this.seats[row][col] = false;
        return true;
      }
      return false;
    }
  
    freeSeat(row, col) {
      if (!this.seats[row][col]) {
        this.seats[row][col] = true;
        return true;
      }
      return false;
    }
  }

const theater = new Theater(5, 8, "Film 1 - Theater 1", 10);

function generateSeatTable() {
    const table = document.getElementById("seatTable");
    table.innerHTML = "";
    for (let i = 0; i < theater.rows; i++) {
        const row = table.insertRow();
        for (let j = 0; j < theater.columns; j++) {
            const cell = row.insertCell();
            if (theater.seats[i][j]) {
                cell.classList.add("available");
                cell.addEventListener("click", () => bookOrFreeSeat(i, j, cell));
            } else {
                cell.classList.add("occupied");
            }
        }
    }
}

function bookOrFreeSeat(row, col, cell) {
    if (theater.seats[row][col]) {
        if (confirm(`Do you want to book the seat at Row ${row + 1}, Column ${col + 1}?`)) {
            if (theater.bookSeat(row, col)) {
                alert("Seat booked successfully!");
                cell.classList.remove("available");
                cell.classList.add("occupied");
            } else {
                alert("Seat is already booked.");
            }
        }
    } else {
        if (confirm(`Do you want to free the seat at Row ${row + 1}, Column ${col + 1}?`)) {
            if (theater.freeSeat(row, col)) {
                alert("Seat freed successfully!");
                cell.classList.remove("occupied");
                cell.classList.add("available");
            }
        }
    }
}

generateSeatTable();
