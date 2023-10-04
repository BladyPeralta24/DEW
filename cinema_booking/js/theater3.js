// Define Theater1 object constructor
function Theater3() {
    this.rows = 7;
    this.columns = 12;
    this.filmName = "Film 3";
    this.ticketPrice = 6;
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
Theater3.prototype.bookSeat = function (row, col) {
    if (this.seats[row][col]) {
        this.seats[row][col] = false; // false means booked
        return true; // Booking successful
    }
    return false; // Seat already booked
};

// Method to free a seat
Theater3.prototype.freeSeat = function (row, col) {
    this.seats[row][col] = true; // true means available
};

// Create an instance of Theater1
const theater3 = new Theater3();