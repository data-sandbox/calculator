let firstNum = null;
let secondNum = null;
let operator = null;
let displayValue = '';
let clearDisplayFlag = false;

const numberButtons = document.querySelectorAll('.number');
const operatorButtons = document.querySelectorAll('.operator');
const equalButton = document.querySelector('.equal');
const clearButton = document.querySelector('.clear');
const deleteButton = document.querySelector('.delete');
const decimalButton = document.querySelector('.decimal');
const percentButton = document.querySelector('.percent');

function clearDisplay() {
    displayValue = '';
    document.getElementById('display-value').textContent = displayValue;
}

function appendNumber(e) {
    if (clearDisplayFlag) {
        clearDisplay();
        clearDisplayFlag = false;
    }
    // console.log(this.id);
    let number = this.id;
    displayValue += number;
    document.getElementById('display-value').textContent = displayValue;
}

function storeOperator(e) {
    // console.log({ firstNum }, { secondNum });
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
    clearDisplayFlag = false;
}

// TODO
// function countDecimals(number) {
//     if (Math.floor(number) === number) return 0;
//     return toString(number).split(".")[1].length || 0;
// }

// function round(result) {
//     let precisionLimit = 7;
//     if (typeof result === 'number' && Number.isInteger(result)) {
//         return result;
//     } else if (countDecimals(result) > precisionLimit) {
//         return result.toFixed(precisionLimit);
//     } else {
//         return result;
//     }
// }

function displayResult(result) {
    // result = round(result);
    document.getElementById('equation-value').textContent = ' ';
    document.getElementById('display-value').textContent = result;
    clearValues();
    displayValue = result;
    clearDisplayFlag = true;
}

function calcEquation() {
    if (!firstNum) {
        firstNum = displayValue;
        displayResult(Number(firstNum));
    } else {
        secondNum = displayValue;
        let result = calcValue(operator, firstNum, secondNum);
        displayResult(result);
    }
}

function clearAll() {
    clearValues();
    displayValue = '';
    document.getElementById('display-value').textContent = 0;
    document.getElementById('equation-value').textContent = null;
}

// TODO
// function convertPercent(value) {
//     value = toString(value)
//     if (value.at(-1) === '%') {
//         value = value.substring(0, value.length - 1);
//         return Number(value) / 100;
//     } else {
//         return Number(value);
//     }
// }

function calcValue(operator, a, b) {
    console.log({ operator }, { a }, { b });
    // a = Number(convertPercent(a));
    // b = Number(convertPercent(b));
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

function deleteChar() {
    if (displayValue) {
        // TODO: displayValue might be 'number'
        displayValue = displayValue.substring(0, displayValue.length - 1);
        document.getElementById('display-value').textContent = displayValue;
    }
}

function insertDecimal() {
    displayValue += '.';
    document.getElementById('display-value').textContent = displayValue;
}

function insertPercent() {
    displayValue += '%';
    document.getElementById('display-value').textContent = displayValue;
}

numberButtons.forEach(button => button.addEventListener('click', appendNumber));
operatorButtons.forEach(button => button.addEventListener('click', storeOperator));
equalButton.addEventListener('click', calcEquation);
clearButton.addEventListener('click', clearAll);
deleteButton.addEventListener('click', deleteChar);
decimalButton.addEventListener('click', insertDecimal);
// percentButton.addEventListener('click', insertPercent);
