let firstNum = null;
let secondNum = null;
let operator = null;
let displayValue = '';
let clearDisplayFlag = false;

const numberButtons = document.querySelectorAll('.number');
const operatorButtons = document.querySelectorAll('.operator');
const equalButton = document.querySelector('.equal');
const clearButton = document.querySelector('.clear');

function clearDisplay() {
    displayValue = '';
    document.getElementById('display-value').textContent = displayValue;
}

function appendNumber(e) {
    if (clearDisplayFlag) {
        clearDisplay();
        clearDisplayFlag = false;
    }
    console.log(this.id); // debug
    let number = this.id;
    displayValue += number;
    document.getElementById('display-value').textContent = displayValue;

    console.log({ firstNum }, { secondNum });
}

function storeOperator(e) {
    console.log(this.id); // debug
    console.log({ firstNum }, { secondNum });
    if (!firstNum) {
        operator = this.id;
        firstNum = displayValue;
        document.getElementById('equation-value').textContent = `${displayValue} ${this.value}`;
        clearDisplayFlag = true;
    } else {
        secondNum = displayValue;
    }
    if (secondNum) {
        let result = calcValue(operator, firstNum, secondNum); // use previously clicked operator
        document.getElementById('equation-value').textContent += ` ${secondNum} ${this.value}`;
        document.getElementById('display-value').textContent = null;
        operator = this.id; // store latest operator
        firstNum = result;
        secondNum = displayValue;
        displayValue = '';
        clearDisplayFlag = true;
    }
}

function clearValues() {
    firstNum = null;
    secondNum = null;
    operator = null;
    displayValue = '';
    clearDisplayFlag = false;
    console.log({ firstNum }, { secondNum });
}

function calcEquation() {
    secondNum = displayValue;
    let result = calcValue(operator, firstNum, secondNum);
    document.getElementById('equation-value').textContent = ' ';
    document.getElementById('display-value').textContent = result;
    clearValues();
}

function clearAll() {
    clearValues();
    document.getElementById('display-value').textContent = 0;
    document.getElementById('equation-value').textContent = null;
}


function calcValue(operator, a, b) {
    console.log({ operator }, { a }, { b });
    a = Number(a);
    b = Number(b);
    switch (operator) {
        case 'add':
            return a + b;
        case 'subtract':
            return a - b;
        case 'multiply':
            return a * b;
        case 'divide':
            if (b === 0) return 'undefined';
            return a / b;
        default:
            return undefined;
    }
}

numberButtons.forEach(button => button.addEventListener('click', appendNumber));
operatorButtons.forEach(button => button.addEventListener('click', storeOperator));
equalButton.addEventListener('click', calcEquation);
clearButton.addEventListener('click', clearAll);
