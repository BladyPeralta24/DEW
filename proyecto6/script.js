// Define objects to represent the keys
const keyboardRows = [

    [
        { value: 'Esc', type: 'special' },
        { value: '1', type: 'number' },
        { value: '2', type: 'number' },
        { value: '3', type: 'number' },
        { value: '4', type: 'number' },
        { value: '5', type: 'number' },
        { value: '6', type: 'number' },
        { value: '7', type: 'number' },
        { value: '8', type: 'number' },
        { value: '9', type: 'number' },
        { value: '0', type: 'number' },
        { value: '?', type: 'special' },
        { value: '¿', type: 'special' },
        { value: 'Delete', type: 'special', width: '100px' }
    ],
    [
        { value: 'Tab', type: 'special', width: '70px' },
        { value: 'q', type: 'letter' },
        { value: 'w', type: 'letter' },
        { value: 'e', type: 'letter' },
        { value: 'r', type: 'letter' },
        { value: 't', type: 'letter' },
        { value: 'y', type: 'letter' },
        { value: 'u', type: 'letter' },
        { value: 'i', type: 'letter' },
        { value: 'o', type: 'letter' },
        { value: 'p', type: 'letter' },
        { value: '^', type: 'special' },
        { value: '+', type: 'special' },
        { value: 'Enter', type: 'special', width: '100px' }
    ],
    [
        { value: 'CapsLock', type: 'special', width: '100px' },
        { value: 'a', type: 'letter' },
        { value: 's', type: 'letter' },
        { value: 'd', type: 'letter' },
        { value: 'f', type: 'letter' },
        { value: 'g', type: 'letter' },
        { value: 'h', type: 'letter' },
        { value: 'j', type: 'letter' },
        { value: 'k', type: 'letter' },
        { value: 'l', type: 'letter' },
        { value: 'ñ', type: 'letter' },
        { value: '{', type: 'special' },
        { value: '}', type: 'special' },
        { value: 'ç', type: 'special' }

    ],
    [
        { value: 'SHIFT', type: 'special', width: '110px' },
        { value: '<', type: 'special' },
        { value: 'z', type: 'letter' },
        { value: 'x', type: 'letter' },
        { value: 'c', type: 'letter' },
        { value: 'v', type: 'letter' },
        { value: 'b', type: 'letter' },
        { value: 'n', type: 'letter' },
        { value: 'm', type: 'letter' },
        { value: ',', type: 'special' },
        { value: '.', type: 'special' },
        { value: '-', type: 'special' },
        { value: 'SHIFT', type: 'special', width: '110px' }
    ],
    [
        { value: 'Ctrl', type: 'special' },
        { value: 'WIN', type: 'special' },
        { value: 'Alt', type: 'special' },
        { value: 'SPACE', type: 'special', width: '550px' },
        { value: 'Alt Gr', type: 'special' },
        { value: 'WIN', type: 'special' },
        { value: 'Ctrl', type: 'special' }
    ],
];

// Function to generate keys in the DOM
function generateKeyboard() {
    const keyboardContainer = document.getElementById('keyboard');

    keyboardRows.forEach(row => {
        const rowElement = document.createElement('div');
        rowElement.classList.add('keyboard-row');

        row.forEach(key => {
            const keyElement = document.createElement('div');
            keyElement.classList.add('key');

            // Add classes based on key type
            switch (key.type) {
                case 'special':
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

            if (key.width) {
                keyElement.style.width = key.width;
            }

            keyElement.addEventListener('click', function () {
                handleKeyPress(key.value);
            });

            rowElement.appendChild(keyElement);
        });

        keyboardContainer.appendChild(rowElement);
    });
}

// Declare variables to track the states of each special button
let isShiftPressed = false;
let isCapsLockActive = false;
let isAltPressed = false;
let isCtrlPressed = false;

// Function to handle key presses (both clicks and actual key presses)
function handleKeyPress(keyValue) {

    console.log(`Key ${keyValue} pressed`);

    // Handle special cases
    const screen = document.getElementById("screen");

    // Variable to store inputted keyboard values, initializing to empty
    let chars = [];

    switch (keyValue) {
        case 'SPACE':
            screen.textContent += ' ';
            break;
        case 'Delete':
            // Logic for deletion
            chars = screen.textContent.split('');
            chars.pop();
            screen.textContent = chars.join('');
            break;
        case 'Enter':
            screen.textContent += '\n';
            break;
        case 'SHIFT':
            // Change the state of the Shift key
            isShiftPressed = !isShiftPressed;

            // Change only letter keys to uppercase
            const letterKey = document.querySelectorAll('.keyLetter');
            letterKey.forEach(keyElement => {
                const originalValue = keyElement.textContent;
                const isUpperCase = keyElement.classList.toggle('upper');
                const newCaseValue = isUpperCase ? originalValue.toUpperCase() : originalValue.toLowerCase();

                keyElement.textContent = newCaseValue;
            });

            // Change the result of the < key to >
            // Result: Not addressed
            break;
        case 'CapsLock':
            // Change the state of CapsLock
            isCapsLockActive = !isCapsLockActive;

            // Change all letter keys to uppercase or lowercase
            const allLetterKeys = document.querySelectorAll('.keyLetter');
            allLetterKeys.forEach(keyElement => {
                const originalValue = keyElement.textContent;
                const newCaseValue = isCapsLockActive ? originalValue.toUpperCase() : originalValue.toLowerCase();
                keyElement.textContent = newCaseValue;
            });
            break;
        case 'Alt':
            // Change the state of the Alt key
            isAltPressed = true;
            // Button not implemented
            break;
        case 'Alt Gr':
            isAltPressed = true;
            // Logic for the AltGraph key
            document.querySelectorAll('.keyNumber').forEach(keyElement => {
                const num = keyElement.textContent;
                switch (num) {
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
                        // Change the 'e' key to the '€' symbol
                        document.querySelectorAll('.keyLetter').forEach(keyElement => {
                            if (keyElement.textContent == 'e' || keyElement.textContent == 'E') {
                                keyElement.textContent = '€';
                                screen.textContent = screen.textContent + '€';
                            }
                        });
                }

            });
            // Result: Not favored; Does not work as expected
            break;
        case 'Ctrl':
            // Change the state of the Ctrl key
            isCtrlPressed = true;
            break;
        case 'Tab':
            // Change the state of the Tab key
            screen.textContent += '    ';
            break;
        default:
            screen.textContent += isShiftPressed ? (isCapsLockActive ? keyValue.toLowerCase() : keyValue.toUpperCase()) : (isCapsLockActive ? keyValue.toUpperCase() : keyValue.toLowerCase());
            chars = screen.textContent.split('');
            console.log(chars);
    }
}

// Event to capture actual keyboard key presses
document.addEventListener('keydown', function (e) {
    // Flatten the array of keys
    const flattenedKeys = keyboardRows.flat();

    // Find the pressed key (ignoring case)
    const pressedKey = flattenedKeys.find(key => {
        // Check if the pressed key matches the value or code of the key
        return (
            key.value.toLowerCase() === e.key.toLowerCase() ||
            key.code === e.code ||
            (key.type === 'special' && key.value === 'SPACE' && e.code === 'Space') ||
            (key.type === 'special' && key.value === 'Tab' && e.code === 'TAB') ||
            (key.type === 'special' && key.value === 'Delete' && e.code === 'Backspace') ||
            (key.type === 'special' && key.value === 'SHIFT' && e.code === 'ShiftLeft') ||
            (key.type === 'special' && key.value === 'SHIFT' && e.code === 'ShiftRight') ||
            (key.type === 'special' && key.value === 'CapsLock' && e.code === 'CapsLock') ||
            (key.type === 'special' && key.value === 'Alt Gr' && e.code === 'AltRight') ||
            (key.type === 'special' && key.value === 'Alt' && e.code === 'AltLeft') ||
            (key.type === 'special' && key.value === 'Enter' && e.code === 'Enter') || e.code === 'NumpadEnter'
        );
    });

    // If the key is found, handle the press and prevent the event from propagating
    if (pressedKey) {
        handleKeyPress(pressedKey.value);
        e.preventDefault(); // Prevent the event from propagating
    }
});

// Event to capture the release of special keys
document.addEventListener('keyup', function (e) {
    switch (e.code) {
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

// Function to add a class to each key on the keyboard
function addKeyToKeyboardRows(rows) {
    for (let i = 0; i < rows.length; i++) {
        const row = rows[i];
        for (let j = 0; j < row.length; j++) {
            const key = row[j];
            key.classes = key.classes ? key.classes + ' key' : 'key';
        }
    }
}

// Call the function to add the "key" class
addKeyToKeyboardRows(keyboardRows);

console.log(keyboardRows);

// Call the function to generate the keyboard
generateKeyboard();
