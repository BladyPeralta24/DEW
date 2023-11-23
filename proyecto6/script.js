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
        {value: 'Tab', type: 'special', width: '70px'},
        {value: 'q', type: 'letter'},
        {value: 'w', type: 'letter'},
        {value: 'e', type: 'letter'},
        {value: 'r', type: 'letter'},
        {value: 't', type: 'letter'},
        {value: 'y', type: 'letter'},
        {value: 'u', type: 'letter'},
        {value: 'i', type: 'letter'},
        {value: 'o', type: 'letter'},
        {value: 'p', type: 'letter'},
        {value: '^', type: 'especial'},
        {value: '+', type: 'especial'},
        {value: 'Enter', type: 'especial', width: '100px'}
    ],
    [
        {value: 'Bloq Mayus', type: 'especial', width: '100px'},
        {value: 'a', type: 'letter'},
        {value: 's', type: 'letter'},
        {value: 'd', type: 'letter'},
        {value: 'f', type: 'letter'},
        {value: 'g', type: 'letter'},
        {value: 'h', type: 'letter'},
        {value: 'j', type: 'letter'},
        {value: 'k', type: 'letter'},
        {value: 'l', type: 'letter'},
        {value: 'ñ', type: 'letter'},
        {value: '{', type: 'especial'},
        {value: '}', type: 'especial'},
        {value: 'ç', type: 'especial'}
        
    ],
    [
        {value: 'SHIFT', type: 'especial', width: '110px'},
        {value: '<', type: 'especial'},
        {value: 'z', type: 'letter'},
        {value: 'x', type: 'letter'},
        {value: 'c', type: 'letter'},
        {value: 'v', type: 'letter'},
        {value: 'b', type: 'letter'},
        {value: 'n', type: 'letter'},
        {value: 'm', type: 'letter'},
        {value: ',', type: 'especial'},
        {value: '.', type: 'especial'},
        {value: '-', type: 'especial'},
        {value: 'SHIFT', type: 'especial', width: '110px'}
    ],
    [
        {value: 'Ctrl', type: 'especial'},
        {value: 'WIN', type: 'especial'},
        {value: 'Alt', type: 'especial'},
        {value: 'SPACE', type: 'especial', width: '550px'},
        {value: 'Alr Gr', type: 'especial'},
        {value: 'WIN', type: 'especial'},
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

            // Agregar clases según el tipo de tecla
            switch (key.type){
                case 'especial':
                    keyElement.classList.add('keySpecial');
                    break;
                case 'letter':
                    keyElement.classList.add('keyLetter');
                    break;
                case 'number':
                    keyElement.classList.add('keyNumber');
                    break;
                default:
                    break;
            }

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

    // Variable para guardar los valores introducidos del teclado, inicializando a vacio
    let chars = [];
    
    switch(keyValue){
        case 'SPACE':
            screen.textContent += ' ';
            break;
        case 'Delete':
            // Logica para borrar
            chars = screen.textContent.split('');
            chars.pop();
            screen.textContent = chars.join('');
            break;
        case 'Enter':
            screen.textContent += '\n';
            break;
        case 'SHIFT':
            // cambiar solo las teclas de letras a mayusculas
            const letterKey = document.querySelectorAll('.keyLetter');
            letterKey.forEach(keyElement => {
                const originalValue = keyElement.textContent;
                const isUpperCase = keyElement.classList.toggle('upper');
                const newCaseValue = isUpperCase ? originalValue.toUpperCase() : originalValue.toLowerCase();
                keyElement.textContent = newCaseValue;
            });
            break;
        default:
            // Reflejar el estado de Shift al agregar caracteres al screen
            const isShiftActive = document.querySelector('.SHIFT').classList.contains('upper');
            const keyType = document.querySelector(`.key${keyValue.charAt(0).toUpperCase()}${keyValue.slice(1)}`).classList.contains('upper') ? 'upper' : '';
            screen.textContent += isShiftActive ? keyValue.toUpperCase() : (keyType === 'upper' ? keyValue.toLowerCase() : keyValue);
            // screen.textContent += keyValue;
            chars = screen.textContent.split('');
            console.log(chars);
    }
}



// Evento para capturar las teclas reales del teclado
document.addEventListener('keydown', function (e) {
    // Aplanar el arreglo de teclas
    const flattenedKeys = keyboardRows.flat();

    // Encontrar la tecla presionada (ignorando mayúsculas/minúsculas)
    const pressedKey = flattenedKeys.find(key => {
        // Verificar si la tecla presionada coincide con el valor o el código de la tecla
        return (
            key.value.toLowerCase() === e.key.toLowerCase() ||
            key.code === e.code ||
            (key.type === 'especial' && key.value === 'SPACE' && e.code === 'Space') ||
            (key.type === 'especial' && key.value === 'Delete' && e.code === 'Backspace') ||
            (key.type === 'especial' && key.value === 'SHIFT' && e.code === 'Shift') ||
            (key.type === 'especial' && key.value === 'Enter' && e.code === 'Enter')
            // Agregar otras teclas especiales según sea necesario
        );
    });

    // Si se encontró la tecla, manejar la pulsación y evitar la propagación del evento
    if (pressedKey) {
        handleKeyPress(pressedKey.value);
        e.preventDefault(); // Evitar que el evento se propague
    }
});




// Funcion para añadir una clase a cada tecla del teclado
function addKeyToKeyboardRows(rows){
    for (let i = 0; i < rows.length; i++){
        const row = rows[i];
        for (let j = 0; j < row.length; j++){
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
