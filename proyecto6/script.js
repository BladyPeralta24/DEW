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
        {value: 'CapsLock', type: 'especial', width: '100px'},
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
        {value: 'Alt Gr', type: 'especial'},
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
// Declarar variables para rastrear los estados de cada boton especial
let isShiftPressed = false;
let isCapsLockActive = false;
let isAltPressed = false;
let isCtrlPressed = false;

//Funcion para manejar la pulsación de teclas (tanto clics como teclas reales)
function handleKeyPress(keyValue){

    console.log(`Tecla ${keyValue} presionada`);

    //Manejo de los casos especiales
    const screen = document.getElementById("screen");

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
            //Cambiar el estado de la tecla Shift
            isShiftPressed = !isShiftPressed;
            
            // cambiar solo las teclas de letras a mayusculas
            const letterKey = document.querySelectorAll('.keyLetter');
            letterKey.forEach(keyElement => {
                const originalValue = keyElement.textContent;
                const isUpperCase = keyElement.classList.toggle('upper');
                const newCaseValue = isUpperCase ? originalValue.toUpperCase() : originalValue.toLowerCase();
                keyElement.textContent = newCaseValue;
            });
            break;
        case 'CapsLock':
            // Cambiar el estado de CapsLock
            isCapsLockActive = !isCapsLockActive;

            // Cambiar todas las teclas de letras a mayuscula o minuscula
            const allLetterKeys = document.querySelectorAll('.keyLetter');
            allLetterKeys.forEach(keyElement => {
                const originalValue = keyElement.textContent;
                const newCaseValue = isCapsLockActive ? originalValue.toUpperCase() : originalValue.toLowerCase();
                keyElement.textContent = newCaseValue;
            });
            break;
        case 'Alt':
            // Cambiar el estado de la tecla Alt
            isAltPressed = true;
            break;
        case 'Alt Gr':
            isAltPressed = true;
            // Lógica para la tecla AltGraph
            document.querySelectorAll('.keyNumber').forEach(keyElement => {
                const num = keyElement.textContent;
                switch (num){
                    case '1':
                    keyElement.textContent = '|';
                    break;
                    case '2':
                        keyElement.textContent = '@';
                        break;
                    case '3':
                        keyElement.textContent = '#';
                        break;
                    case '4':
                        keyElement.textContent = '~';
                        break;
                    case '5':
                        keyElement.textContent = '€';
                        break;
                    default:
                        // Cambiar la tecla 'e' al símbolo '€'
                        document.querySelectorAll('.keyLetter').forEach(keyElement => {
                            if (keyElement.textContent == 'e' || keyElement.textContent == 'E'){
                                keyElement.textContent = '€';
                                screen.textContent = screen.textContent + '€';
                            }
                        });
                }
                
            });
            break;
        case 'Ctrl':
            // Cambiar el estado de la tecla Ctrl
            isCtrlPressed = true;
            break;
        case 'Tab':
            // Cambiar el estado de la tecla Tab
            screen.textContent += '    ';
            break;
        default:
            screen.textContent += isShiftPressed ? (isCapsLockActive ? keyValue.toLowerCase() : keyValue.toUpperCase()) : (isCapsLockActive ? keyValue.toUpperCase() : keyValue.toLowerCase());
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
            (key.type === 'especial' && key.value === 'Tab' && e.code === 'TAB') ||
            (key.type === 'especial' && key.value === 'Delete' && e.code === 'Backspace') ||
            (key.type === 'especial' && key.value === 'SHIFT' && e.code === 'ShiftLeft') ||
            (key.type === 'especial' && key.value === 'SHIFT' && e.code === 'ShiftRight') ||
            (key.type === 'especial' && key.value === 'CapsLock' && e.code === 'CapsLock') ||
            (key.type === 'especial' && key.value === 'Alt Gr' && e.code === 'AltRight') ||
            (key.type === 'especial' && key.value === 'Alt' && e.code === 'AltLeft') ||
            (key.type === 'especial' && key.value === 'Enter' && e.code === 'Enter') || e.code === 'NumpadEnter'
        );
    });

    // Si se encontró la tecla, manejar la pulsación y evitar la propagación del evento
    if (pressedKey) {
        handleKeyPress(pressedKey.value);
        e.preventDefault(); // Evitar que el evento se propague
    }
});

// Evento para capturar la liberación de teclas especiales
document.addEventListener('keyup', function (e){
    switch (e.code){
        case 'Alt':
            isAltPressed = false;
            break;
        case 'Ctrl':
            isCtrlPressed = false;
            break;
        case 'SHIFT':
            isShiftPressed = false;
            break;
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
