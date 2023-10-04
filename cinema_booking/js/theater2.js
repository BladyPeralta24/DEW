// Define Theater1 object constructor
function Theater2() {
    this.rows = 6;
    this.columns = 11;
    this.filmName = "Film 2";
    this.ticketPrice = 8;
    this.seats = []; // Initialize the seats array
    // Initialize seats as available
    for (let i = 0; i < this.rows; i++) {
        this.seats[i] = [];
        for (let j = 0; j < this.columns; j++) {
            this.seats[i][j] = true; // true means available
        }
    }
}

// Method to book a seat
Theater2.prototype.bookSeat = function (row, col) {
    if (this.seats[row][col]) {
        this.seats[row][col] = false; // false means booked
        return true; // Booking successful
    }
    return false; // Seat already booked
};

// Method to free a seat
Theater2.prototype.freeSeat = function (row, col) {
    this.seats[row][col] = true; // true means available
};

// Create an instance of Theater1
const theater2 = new Theater2();