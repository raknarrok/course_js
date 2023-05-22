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

/**
 * @name addObjectSections
 * @summary The information will be added in the DOOM according the information added in the object 
 */

function addObjectSections() {

    // Variable Declaration & Definition
    let sections = [
        {
            id: "section1",
            name: "Nuestros Collares",
            description: "Collares de moda para todos los gustos"
        },
        {
            id: "section2",
            name: "Nuestros Anillos",
            description: "Anillos de moda para todos los gustos"
        },
        {
            id: "section3",
            name: "Nuestros Aretes",
            description: "Aretes de moda para todos los gustos"
        }
    ];

    const buttonsBySections = {

        // Setion 1 Collares
        section1: [
            {
                id: "cItem1",
                name: "Collar de perlas",
                description: "Collar de perlas de agua dulce",
                price: 100
            },
            {
                id: "cItem2",
                name: "Collar de oro",
                description: "Collar de oro de 14k",
                price: 200
            },
            {
                id: "cItem3",
                name: "Collar de plata",
                description: "Collar de plata de 925",
                price: 300
            }
        ],
        // Section 2 Anillos
        section2: [
            {
                id: "aItem1",
                name: "Anillo de perlas",
                description: "Anillo de perlas de agua dulce",
                price: 100
            },
            {
                id: "aItem2",
                name: "Anillo de oro",
                description: "Anillo de oro de 14k",
                price: 200
            },
            {
                id: "aItem3",
                name: "Anillo de plata",
                description: "Anillo de plata de 925",
                price: 300
            }
        ],
        // Section 3 Aretes
        section3: [
            {
                id: "arItem1",
                name: "Aretes de perlas",
                description: "Aretes de perlas de agua dulce",
                price: 100
            },
            {
                id: "arItem2",
                name: "Aretes de oro",
                description: "Aretes de oro de 14k",
                price: 200
            },
            {
                id: "arItem3",
                name: "Aretes de plata",
                description: "Aretes de plata de 925",
                price: 300
            }
        ]
    };

    // Clear HTML Before of load the information
    if (document.getElementById("idAddSectionObjects").hasChildNodes()) {
        $(`#idAddSectionObjects`).html(``);
    }

    const addHeadersObject = document.getElementById("idAddSectionObjects");

    // Create Child Element
    for (const section of sections) {

        // Assign Element Type
        const tagMainDiv = document.createElement("div"); // Div Created

        // Add Attributes & Values
        tagMainDiv.setAttribute("id", section.id);
        tagMainDiv.setAttribute("class", "col-sm");

        // Assign Each Section to the Header Object
        addHeadersObject.appendChild(tagMainDiv); // New Div Added without Elements

        // Create Child Element Card Title
        const tagHeaderCard = document.createElement("h2"); // H2 Created

        // Add Attributes & Values
        tagHeaderCard.setAttribute("id", `h${section.id}`);
        tagHeaderCard.setAttribute("class", "card-title fs-4");

        // Create a new text node for the h2 element
        const tagHeaderContent = document.createTextNode(section.name); // H2 Text Created

        // Create Child Dependency
        tagHeaderCard.appendChild(tagHeaderContent); // Add Text Node as property of H2

        //Assign Each Header to the MainDiv Object
        tagMainDiv.appendChild(tagHeaderCard); // New H2 Added Elements & Displayed

        addDescription(section);

        // Buttons Assigment
        const buttonsCount = Object.keys(buttonsBySections).length;

        // Review if the Section has Buttons
        const reviewButtons = buttonsBySections[`${section.id}`].length;
        console.log(`Current Buttons ${section.id} is ${reviewButtons}`);

        // For Section to Iterate the buttons
        for (const button of buttonsBySections[`${section.id}`]) {

            // Assign Element Type
            const tagButton = document.createElement("button"); // Button Created

            // Add Attributes & Values
            tagButton.setAttribute("id", `btn${button.id}`);
            tagButton.setAttribute("class", "btn btn-outline-primary");
            tagButton.setAttribute("type", "button");

            // Create a new text node for the Button element
            const tagButtonText = document.createTextNode(button.name); // Button Text Created
            tagButton.appendChild(tagButtonText); // Add Text Node as property of Button

            // Assign Each Button to the MainDiv Object
            tagMainDiv.appendChild(tagButton); // New Button Added without Elements
        };
    };
}

/**
 * Show Elements with methods
 */
const addDescription = (section) => {
    $(`#${section.id}`).append(`<p class="fs-5">${section.description}</p>`);
};

function removeSection() {
    $(`#idAddSectionObjects`).html(``);
}

/** 
 * @name showHideSection
 * @summary Display or Hide the Section according to the button text.
 * @description This method display or hide the section according to the button text.
 * @param NA
*/
function showHideSection() {

    // Display or Hide the Section
    document.getElementById('idSectionShowHide').style.getPropertyValue('display') === 'none' ? document.getElementById('idSectionShowHide').style.display = 'block' : document.getElementById('idSectionShowHide').style.display = 'none';

    // Update the button text
    document.getElementById('idBtnShowHide').innerText === 'Mostrar' ? document.getElementById('idBtnShowHide').innerText = 'Ocultar' : document.getElementById('idBtnShowHide').innerText = 'Mostrar';
}

/**
 * @name filterInformation
 * @summary Method to filter the information according to the user selection.
 */

function filterInformation(filterValue) {

    // Retrieve all li elements
    const arrLiElements = document.querySelectorAll(`#idProductList li`);

    // Conditional Statement
    for (let i = 0; i < arrLiElements.length; i++) {

        // To lower case
        filterValue = filterValue.toLowerCase();
        let elementLower = arrLiElements[i].innerText.toLowerCase();

        if (elementLower.includes(filterValue)) {
            showElements(arrLiElements[i]);
        } else {
            hideElements(arrLiElements[i]);
        }
    }

}

// Hide the elements with out the filter value
const hideElements = (element) => {
    element.style.display = 'none';
}

// Show the elements with out the filter value
const showElements = (element) => {
    element.style.display = 'block';
}