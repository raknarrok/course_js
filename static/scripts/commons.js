'use strict';

/**
 * @name calculateArea
 * @summary Method to retrieve the shape area.
 * @author Luis Fernandez
 * @param NA
 */
function calculateArea(shape) {

    // Variable Declaration & Definition
    let area;

    // Conditional Statement
    switch (shape) {
        case `square`:

            // Variable Declaration & Definition
            area = $(`#idSquareSideA`).val() * $(`#idSquareSideA`).val();

            // SetUp HTML Result
            displayResult(`idSquareArea`, area);
            break;
        case `circle`:

            // Variable Declaration & Definition
            area = Math.PI * Math.pow($(`#idRadio`).val(), 2);

            // SetUp HTML Result
            displayResult(`idCircleArea`, area);
            break;
        case `rectangle`:

            // Variable Declaration & Definition
            area = $(`#idRectangleHeight`).val() * $(`#idRectangleWidth`).val();

            // Conditional Statement
            if ($(`#idRectangleHeight`).val() === $(`#idRectangleWidth`).val()) {
                document.getElementById(`idRectangleArea`).innerHTML = "Esto es un cuadrado!!";
            } else {
                // SetUp HTML Result
                displayResult(`idRectangleArea`, area);
            }

            break;
        case `triangle`:

            // Variable Declaration & Definition
            area = ($(`#idTriangleBase`).val() * $(`#idTriangleHeight`).val()) / 2;

            // SetUp HTML Result
            displayResult(`idTriangleArea`, area);
            break;
        default:
            area = 0;
            break;
    }

    // Return Statement
    return area;
}

/**
 * @name displayResult
 * @summary Method to retrieve if is a valid number.
 * @author Luis Fernandez
 * @param value
 */

function displayResult(id, value) {
    // SetUp HTML Result
    document.getElementById(`${id}`).innerHTML = value.toFixed(2);
}

/**
 * @name calculateTable
 * @summary Display Multiply Information.
 * @author Luis Fernandez
 * @param NA
 */
function calculateTable() {

    // Variable Declaration & Definition
    let number = $(`#idTableNumber`).val();

    // Conditional Statement
    if (number > 0 && number < 100) {
        $(`#idTableResult`).html(``); // Clean the HTML

        // Print from 1 to 10 the multiply information
        for (let index = 1; index <= 10; index++) {
            $(`#idTableResult`).append(`<span>${number} X ${index} = ${(number * index).toFixed(2)}</span></br>`);
        }
    }
    else {
        // Call the method to validate the error to be displayed
        validateNumber(number);
    }
}

/**
 * @name validateNumber
 * @summary Display the error according if is number or string
 * @description This method validate if the value is a number or string and display the error according to the value type.
 * @param value
 */
function validateNumber(value) {

    // Conditional Statement
    if (isNaN(value)) {
        document.getElementById(`idTableResult`).innerHTML = `El valor ingresado no es un número`;
    } else if (value >= 100) {
        document.getElementById(`idTableResult`).innerHTML = `Agregar un número menor a 100`;
    } else {
        document.getElementById(`idTableResult`).innerHTML = `Agregar un número mayor a 0`;
    }
}

/**
 * @name calcularOhm
 * @summary Display the result value according to the option selected by the user.
 * @description This method calculate the result according to the option selected by the user.
 * @param value 
 */
function calcularOhm(value) {

    // Variable Declaration & Definition
    let result;

    // Conditional Statement
    switch (value) {
        case `volts`:
            result = $(`#idVoltsFirst`).val() * $(`#idVoltsSecond`).val();
            displayResult(`idVoltsResult`, result);
            break;
        case `amperes`:
            result = $(`#idAmpsFirst`).val() / $(`#idAmpsSecond`).val();
            displayResult(`idAmperesResult`, result);
            break;
        case `ohm`:
            result = $(`#idOhmFirst`).val() / $(`#idOhmSecond`).val();
            displayResult(`idOhmResult`, result);
            break;
        default:
            result = 0;
            break;
    }
}

/**
 * @name regularOperations
 * @summary Display the result value according to the option selected by the user.
 * @description This method calculate the result according to the option selected by the user.
 * @param value
 */

function regularOperations(value) {

    // Variable Declaration & Definition
    let result;

    // Conditional Statement
    switch (value) {
        case `addition`:
            result = Number($(`#idAdditionFirst`).val()) + Number($(`#idAdditionSecond`).val());
            displayResult(`idAdditionResult`, result);
            break;
        case `subtraction`:
            result = $(`#idSubtractionFirst`).val() - $(`#idSubtractionSecond`).val();
            displayResult(`idSubtractionResult`, result);
            break;
        case `multiplication`:
            result = $(`#idMultiplicationFirst`).val() * $(`#idMultiplicationSecond`).val();
            displayResult(`idMultiplicationResult`, result);
            break;
        case `division`:
            result = $(`#idDivisionFirst`).val() / $(`#idDivisionSecond`).val();
            displayResult(`idDivisionResult`, result);
            break;
        default:
            result = 0;
            break;
    }
}
