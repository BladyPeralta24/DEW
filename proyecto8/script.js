// Define the regular expression object
let regExp = {
    // Regular expression for the name
    name: /^[A-Z][a-zA-ZÀ-ÿ\s]{3,20}$/,
    // Regular expression for the last name, no more than two last names separated by a space, each starting with an uppercase letter
    surname: /^[A-Z][a-zA-ZÀ-ÿ\s]{3,20}[ ][A-Z][a-zA-ZÀ-ÿ\s]{3,20}$/,
    // Regular expression for the ID number
    dni: /^\d{8}[a-zA-Z]$/,
    // Regular expression for the date of birth
    date: /^\d{2}\/\d{2}\/\d{4}$/,
    // Regular expression for the Spanish postal code
    postCode: /^\d{5}$/,
    // Regular expression for the email
    email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    // Regular expression for the landline phone, does not accept special characters, starting with 8 or 9
    phone: /^[8-9]\d{8}$/,
    // Regular expression for the mobile phone, does not accept special characters, starting with 6 or 7
    mobile: /^[6-7]\d{8}$/,
    // Regular expression for the IBAN, starting with ES and containing 22 characters
    IBAN: /^[ES]{2}[0-9]{2}[a-zA-Z0-9]{4}[a-zA-Z0-9]{7}([a-zA-Z0-9]?){0,16}$/,
    // Regular expression for credit card
    creditCard: /^(?:4[0-9]{12}(?:[0-9]{3})?|[25][1-7][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/,
    // Regular expression for the password, containing at least 12 characters with letters, numbers, and a symbol
    password: /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&_])[A-Za-z\d@$!%*?&_]{12,}$/,
    // Regular expression for the repeat password, containing at least 12 characters with letters, numbers, and a symbol
    repeatPassword: /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&_])[A-Za-z\d@$!%*?&_]{12,}$/
}

// Define an object to store field data
let data = {
    name: '',
    surname: '',
    dni: '',
    date: '',
    postCode: '',
    email: '',
    phone: '',
    mobile: '',
    IBAN: '',
    creditCard: '',
    password: '',
    repeatPassword: ''
}

document.addEventListener('DOMContentLoaded', function () {

    // Get references to form elements
    let form = document.querySelector('.needs-validation');
    let nameInput = form.querySelector('input[name="name"]');
    let surnameInput = form.querySelector('input[name="surname"]');
    let dniInput = form.querySelector('input[name="dni"]');
    let dateInput = form.querySelector('input[name="date"]');
    let postCodeInput = form.querySelector('input[name="postCode"]');
    let emailInput = form.querySelector('input[name="email"]');
    let phoneInput = form.querySelector('input[name="phone"]');
    let mobileInput = form.querySelector('input[name="mobile"]');
    let IBANInput = form.querySelector('input[name="IBAN"]');
    let creditCardInput = form.querySelector('input[name="creditCard"]');
    let passwordInput = form.querySelector('input[name="password"]');
    let repeatPasswordInput = form.querySelector('input[name="repeatPassword"]');

    // Add input event to validate in real-time
    nameInput.addEventListener('input', validateField.bind(null, nameInput, regExp.name));
    surnameInput.addEventListener('input', validateField.bind(null, surnameInput, regExp.surname));
    dniInput.addEventListener('input', validateField.bind(null, dniInput, regExp.dni));
    dateInput.addEventListener('input', validateField.bind(null, dateInput, regExp.date));
    postCodeInput.addEventListener('input', validateField.bind(null, postCodeInput, regExp.postCode));
    emailInput.addEventListener('input', validateField.bind(null, emailInput, regExp.email));
    phoneInput.addEventListener('input', validateField.bind(null, phoneInput, regExp.phone));
    mobileInput.addEventListener('input', validateField.bind(null, mobileInput, regExp.mobile));
    IBANInput.addEventListener('input', validateField.bind(null, IBANInput, regExp.IBAN));
    creditCardInput.addEventListener('input', validateField.bind(null, creditCardInput, regExp.creditCard));
    passwordInput.addEventListener('input', validateField.bind(null, passwordInput, regExp.password));
    repeatPasswordInput.addEventListener('input', validateRepeatPassword);

    // Add submit event to validate the form
    form.addEventListener('submit', function (event) {
        // Perform validations using regular expressions
        validateField(nameInput, regExp.name);
        validateField(surnameInput, regExp.surname);
        validateField(dniInput, regExp.dni);
        validateField(postCodeInput, regExp.postCode);
        validateField(emailInput, regExp.email);
        validateField(phoneInput, regExp.phone);
        validateField(mobileInput, regExp.mobile);
        validateField(IBANInput, regExp.IBAN);
        validateField(creditCardInput, regExp.creditCard);
        validateField(passwordInput, regExp.password);
        validateRepeatPassword();

        // Prevent form submission if there are invalid fields
        if (!form.checkValidity()) {
            event.preventDefault();
            event.stopPropagation();
        }

        form.classList.add('was-validated');

    });
    // Retrieve data from localStorage when clicking the Retrieve button
    let retrieveButton = document.querySelector('#btn-retrieve');
    retrieveButton.addEventListener('click', function() {
        let storedData = localStorage.getItem('data');
        if (storedData) {
            let parsedData = JSON.parse(storedData);
            for (let field in data) {
                let input = document.querySelector(`input[name="${field}"]`);
                validateField(input, regExp[field]);
                input.value = parsedData[field];
            }
        }
    });
});

// Clier all fields
function clearAll(){
    for (let field in data) {
        let input = document.querySelector(`input[name="${field}"]`);
        input.value = '';
        input.classList.remove('is-valid', 'is-invalid');
    }
}

// Function to validate a field with a regular expression
function validateField(input, regex) {
    let value = input.value.trim();

    if (value === ''){
        // If the field is empty, remove any validation classes
        input.classList.remove('is-valid', 'is-invalid');
        return;
    }

    let isValid = regex.test(value);

    if (isValid) {
        input.classList.remove('is-invalid');
        input.classList.add('is-valid');
    } else {
        input.classList.remove('is-valid');
        input.classList.add('is-invalid');
    }
}

// Function to validate the repetition of the password
function validateRepeatPassword() {
    let passwordInput = document.querySelector('input[name="password"]');
    let repeatPasswordInput = document.querySelector('input[name="repeatPassword"]');
    let password = passwordInput.value.trim();
    let repeatPassword = repeatPasswordInput.value.trim();

    if (password === repeatPassword && password.length >= 12) {
        repeatPasswordInput.classList.remove('is-invalid');
        repeatPasswordInput.classList.add('is-valid');
    } else {
        repeatPasswordInput.classList.remove('is-valid');
        repeatPasswordInput.classList.add('is-invalid');
    }
}

// Save data to localStorage when interacting with the submit button
let submitButton = document.querySelector('button[type="submit"]');
submitButton.addEventListener('click', function (event) {
    event.preventDefault();

    // Iterate over fields and update values in data
    for (let field in data) {
        let input = document.querySelector(`input[name="${field}"]`);
        
        let isValid = input.classList.contains('is-valid');

        // If the field is not valid, prevent saving and show the error message, except for the date field
        if (!isValid && field !== 'date') {
            alert(`The field ${field} is not valid.`);
            return;
        }

        // Update the value in the data object
        data[field] = input.value;
    }

    // Save all data to localStorage after iteration
    localStorage.setItem('data', JSON.stringify(data));
    console.log('Data saved in localStorage');

    // Reset the screen
    window.location.reload();
});

// Retrieve data from localStorage when clicking the Retrieve button
let retrieveButton = document.querySelector('#btn-retrieve');
retrieveButton.addEventListener('click', function() {
    let storedData = localStorage.getItem('data');
    if (storedData) {
        let parsedData = JSON.parse(storedData);
        for (let field in data) {
            let input = document.querySelector(`input[name="${field}"]`);
            input.value = parsedData[field];
        }
    }
});

const fields = Object.keys(data);






// Apartado de la practica 8
// Llamada al boton Get file
let btnGetFile = document.getElementById('btnGetFile');
// Agregar el evento click
btnGetFile.addEventListener('click', function(){
    // Leer el contenido del archivo
    fetch('persona.json')
        .then(response => response.json())
        .then(fileData => {
            // Leer el archivo por consola
            console.log(fileData[0]);
            // Rellenar el formulario con los datos leidos del archivo
            for (let field in fileData[0]) {
                let input = document.querySelector(`input[name="${field}"]`);
                if (input) {
                    input.value = fileData[0][field];
                }else{
                    alert(`The field ${field} is not valid.`);
                }
            }
            
        });
});

// LLamada al boton POST
let btnPost = document.getElementById('btn-post');
// Agregar el evento click
btnPost.addEventListener('click', post);
function post(){
    // Leer los datos del formulario
    const data = {
        name: document.querySelector('input[name="name"]').value,
        surname: document.querySelector('input[name="surname"]').value,
        dni: document.querySelector('input[name="dni"]').value,
        date: document.querySelector('input[name="date"]').value,
        postCode: document.querySelector('input[name="postCode"]').value,
        email: document.querySelector('input[name="email"]').value,
        phone: document.querySelector('input[name="phone"]').value,
        mobile: document.querySelector('input[name="mobile"]').value,
        IBAN: document.querySelector('input[name="IBAN"]').value,
        creditCard: document.querySelector('input[name="creditCard"]').value,
        password: document.querySelector('input[name="password"]').value,
        repeatPassword: document.querySelector('input[name="repeatPassword"]').value
    }
    fetch('index.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
    })
    .catch(error => console.log(error));
}

// Llamada al boton GET
let btnGet = document.getElementById('btn-get');
// Agregar el evento click
btnGet.addEventListener('click', get);
function get(){
    fetch('http://localhost/proyecto8/index.php')
        .then(response => response.json())
        .then(fileData => {
            console.log(fileData);
            for (let field in fileData[0]) {
                let input = document.querySelector(`input[name="${field}"]`);
                if (input) {
                    input.value = fileData[0][field];
                }else{
                    alert(`The field ${field} is not valid.`);
                }
            }
        })
        .catch(error => console.log(error));
}

// Llamada al boton Get DB
let btnGetDB = document.getElementById('btn-get_db');
// Agregar el evento click
btnGetDB.addEventListener('click', getDB);

function getDB(){
    console.log('Get DB vacio. No funciona');
}




// Llamada al boton Post DB
let btnPostDB = document.getElementById('btn-post_db');
// Agrefar el evento click
btnPostDB.addEventListener('click', postDB);

function postDB(){
    let jsonDataString = {
        name: document.querySelector('input[name="name"]').value,
        surname: document.querySelector('input[name="surname"]').value,
        dni: document.querySelector('input[name="dni"]').value,
        date: document.querySelector('input[name="date"]').value,
        postCode: document.querySelector('input[name="postCode"]').value,
        email: document.querySelector('input[name="email"]').value,
        phone: document.querySelector('input[name="phone"]').value,
        mobile: document.querySelector('input[name="mobile"]').value,
        IBAN: document.querySelector('input[name="IBAN"]').value,
        creditCard: document.querySelector('input[name="creditCard"]').value,
        password: document.querySelector('input[name="password"]').value,
        repeatPassword: document.querySelector('input[name="repeatPassword"]').value
    }
    fetch('bd.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(jsonDataString),
    })
    .then(response => response.text())
    .then(data=>{
        console.log(data);
        clearAll();
    })
    .catch(error => console.log(error));
}
