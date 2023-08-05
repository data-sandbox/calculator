/*
TODO:
- top line showing the expression
*/

const Calculator = (() => {

    const values = [null, null];
    let currentValue = null;
    let operation = null;
    let lastOperation = null;

    const add = (values) => values[0] + values[1];
    const subtract = (values) => values[0] - values[1];
    const multiply = (values) => values[0] * values[1];
    const divide = (values) => {
        if (values[1] === 0) return undefined;
        return values[0] / values[1];
    }

    const getValue = (value) => {
        currentValue = value; // input from console or pull from DOM
    }

    const getOperator = (operator) => {
        if (values[0] !== null && values[1] !== null) {
            evalExpression(values, lastOperation);
        }
        operation = operator;
    }

    const updateValues = () => {
        // console.log(values[0])
        // console.log(values[1])
        console.log({ operation })
        if (values[0] !== null && values[1] !== null) {
            console.log('Here?')
            evalExpression(values, operation);
        } else if (values[0] !== null && values[1] === null) {
            storeValue(1, currentValue);
        } else {
            storeValue(0, currentValue);
            storeValue(1, null);
        }
        console.log({ values })
    };

    const storeValue = (index, value) => {
        values[index] = value;
    };

    const resetAll = () => {
        values[0] = null;
        values[1] = null;
        currentValue = null;
        operation = null;
    }

    const storeCurrentValue = () => {
        storeValue(0, currentValue);
        storeValue(1, null);
        console.log({ values })
    }

    const resetOperation = () => operation = null;

    const evalExpression = () => {
        switch (operation) {
            case 'add':
                currentValue = add(values);
                break;
            case 'subtract':
                currentValue = subtract(values);
                break;
            case 'multiply':
                currentValue = multiply(values);
                break;
            case 'divide':
                currentValue = divide(values);
                break;
        };
        lastOperation = operation;
        resetOperation();
        storeCurrentValue();

    }

    const getCurrentValue = () => currentValue;

    const printCurrentValue = () => console.log(currentValue); // for debug

    const printArray = () => console.log(values); // for debug

    return {
        getValue,
        updateValues,
        resetAll,
        getOperator,
        evalExpression,
        getCurrentValue,
        printCurrentValue, // for debug
        printArray // for debug
    }

});

calc = Calculator();

// Debug: Console only operations to test state logic
console.log(calc.printArray());
console.log(calc.getValue(3));
console.log(calc.updateValues());
console.log(calc.printCurrentValue())
console.log(calc.printArray());
console.log(calc.getOperator('multiply'));
console.log(calc.printArray());
console.log(calc.getValue(4));
console.log(calc.updateValues());
console.log('Array before evaluation:');
console.log(calc.printArray());
// console.log(calc.evalExpression()); // works with this in there
console.log(calc.printCurrentValue());
console.log(calc.printArray());
console.log('New operator')
// console.log(calc.updateValues());
console.log(calc.getOperator('add'));
console.log(calc.getValue(2));
console.log(calc.updateValues());
console.log(calc.printArray());
console.log(calc.evalExpression());
console.log(calc.printCurrentValue());
console.log(calc.printArray());
console.log(calc.evalExpression());




const ScreenController = (() => {

    const calc = Calculator();
    const numberButtons = document.querySelectorAll('.number');
    const operatorButtons = document.querySelectorAll('.operator');
    const equalButton = document.querySelector('.equal');
    const clearButton = document.querySelector('.clear');
    const deleteButton = document.querySelector('.delete');

    let displayValue = '';
    let expressionValue = '';

    const updateValueLine = () => {
        let currentValue = calc.getCurrentValue();
        console.log({ currentValue })
        if (currentValue === undefined) {
            document.getElementById('display-value').textContent = 'undefined';
            return;
        } else if (currentValue === null || isNaN(currentValue)) { currentValue = 0 }
        document.getElementById('display-value').textContent = currentValue;
    };

    const appendExpressionLine = (char) => expressionValue += char;

    const popExpressionLine = () => {
        expressionValue = expressionValue.substring(0, expressionValue.length - 1);
    }

    const updateExpressionLine = () => {
        document.getElementById('equation-value').textContent = expressionValue;
    };

    const updateScreen = () => {
        updateValueLine();
        updateExpressionLine();
    }

    const resetScreen = () => {
        displayValue = '';
    }

    const resetExpression = () => expressionValue = '';

    function numberHandler(e) {
        let number = this.id;
        displayValue += number;
        appendExpressionLine(number);
        // console.log({ displayValue })
        calc.getValue(Number(displayValue));
        calc.printCurrentValue();
        updateScreen();
    }

    function operationHandler(e) {
        calc.updateValues();
        calc.printArray();

        console.log(calc.printArray())
        calc.getOperator(this.id);
        appendExpressionLine(this.value);
        resetScreen();
    }

    function evalHandler() {
        calc.updateValues();
        calc.evalExpression();
        updateScreen();
        resetExpression();
        updateExpressionLine();
        resetScreen();
    }

    function clearHandler() {
        calc.resetAll();
        resetScreen();
        resetExpression();
        updateScreen();
    }

    function delHandler() {
        displayValue = displayValue.substring(0, displayValue.length - 1);
        console.log({ displayValue })
        calc.getValue(Number(displayValue));
        popExpressionLine();
        updateScreen();
    }

    numberButtons.forEach(button => button.addEventListener('click', numberHandler));
    operatorButtons.forEach(button => button.addEventListener('click', operationHandler));
    equalButton.addEventListener('click', evalHandler);
    clearButton.addEventListener('click', clearHandler);
    deleteButton.addEventListener('click', delHandler);

    return {

    }

});

ScreenController();
