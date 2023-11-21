// Definir objetos para representar las trclas
const keyboardRows =[

    [
        {value: 'Esc', type: 'especial'},
        {value: '1', type: 'number'},
        {value: '2', type: 'number'},
        {value: '3', type: 'number'},
        {value: '4', type: 'number'},
        {value: '5', type: 'number'},
        {value: '6', type: 'number'},
        {value: '7', type: 'number'},
        {value: '8', type: 'number'},
        {value: '9', type: 'number'},
        {value: '0', type: 'number'},
        {value: '?', type: 'especial'},
        {value: '¿', type: 'especial'},
        {value: 'Delete', type: 'especial', width: '100px'}
    ],
    [
        {value: 'Tab', type: 'special', width: '100px'},
        {value: 'Q', type: 'letter'},
        {value: 'W', type: 'letter'},
        {value: 'E', type: 'letter'},
        {value: 'R', type: 'letter'},
        {value: 'T', type: 'letter'},
        {value: 'Y', type: 'letter'},
        {value: 'U', type: 'letter'},
        {value: 'I', type: 'letter'},
        {value: 'O', type: 'letter'},
        {value: '`', type: 'especial'},
        {value: '+', type: 'especial'},
        {value: 'Enter', type: 'especial', width: '100px'}
    ],
    [
        {value: 'Bloq Mayus', type: 'especial', width: '100px'},
        {value: 'A', type: 'letter'},
        {value: 'S', type: 'letter'},
        {value: 'D', type: 'letter'},
        {value: 'F', type: 'letter'},
        {value: 'G', type: 'letter'},
        {value: 'H', type: 'letter'},
        {value: 'J', type: 'letter'},
        {value: 'K', type: 'letter'},
        {value: 'L', type: 'letter'},
        {value: 'Ñ', type: 'letter'},
        {value: '{', type: 'especial'},
        {value: '}', type: 'especial'},
        {value: 'ç', type: 'especial'}
        
    ],
    [
        {value: 'SHIFT', type: 'especial', width: '110px'},
        {value: '< >', type: 'especial'},
        {value: 'Z', type: 'letter'},
        {value: 'X', type: 'letter'},
        {value: 'C', type: 'letter'},
        {value: 'V', type: 'letter'},
        {value: 'B', type: 'letter'},
        {value: 'N', type: 'letter'},
        {value: 'M', type: 'letter'},
        {value: ',', type: 'especial'},
        {value: '.', type: 'especial'},
        {value: '-', type: 'especial'},
        {value: 'SHIFT', type: 'especial', width: '110px'}
    ],
    [
        {value: 'Ctrl', type: 'especial'},
        {value: 'WIN', type: 'especial'},
        {value: 'Alt', type: 'especial'},
        {value: 'SPACE', type: 'especial', width: '600px'},
        {value: 'Alr Gr', type: 'especial'},
        {value: 'Ctrl', type: 'especial'}
    ],
];

// Funcion para generar las teclas en el DOM
function generateKeyboard(){
    const keyboardContainer = document.getElementById('keyboard');

    keyboardRows.forEach(row => {
        const rowElement = document.createElement('div');
        rowElement.classList.add('keyboard-row');

        row.forEach(key => {
            const keyElement = document.createElement('div');
            keyElement.classList.add('key');
            keyElement.textContent = key.value;

            if (key.width){
                keyElement.style.width = key.width;
            }

            keyElement.addEventListener('click', function(){
                handleKeyPress(key.value);
            });

            rowElement.appendChild(keyElement);
        });

        keyboardContainer.appendChild(rowElement);
    });
}

//Funcion para manejar la pulsación de teclas (tanto clics como teclas reales)
function handleKeyPress(keyValue){
    console.log(`Tecla ${keyValue} presionada`);

    //Manejo de los casos especiales
    const screen = document.getElementById('screen');
    
    switch(keyValue){
        case 'SPACE':
            screen.textContent += ' ';
            break;
        case 'DELETE':
            // Logica para borrar
            break;
        default:
            screen.textContent += keyValue;
    }
}

// Evento para capturar las teclas reales del teclado
document.addEventListener('keydown', function(e){
    // Verificar si la tecla presionada tiene un valor en el arreglo de teclas
    const pressedKey = keyboardRows
    .flat() // aplanar el arreglo de teclas
    .find(key => key.value.toLowerCase() === e.key.toLowerCase());

    if (pressedKey){
        handleKeyPress(pressedKey.value);
        e.preventDefault(); // Evitar que el evento se propague (por ejemplo, evitar el desplazamiento de la pagina en caso de teclas de flechas)
    }
});


// FUncion para añadir una clase a cada tecla del teclado
function addKeyToKeyboardRows(rows){
    for (let i = 0; i < rows.lenght; i++){
        const row = rows[i];
        for (let j = 0; j < row.lenght; j++){
            const key = row[j];
            key.classes = key.classes ? key.classes + ' key': 'key';
        }
    }
}

// Llamamos a la funcion para añadir la clase "key"
addKeyToKeyboardRows(keyboardRows);

console.log(keyboardRows);

// Llamar a la funcion para generar el teclado
generateKeyboard();
