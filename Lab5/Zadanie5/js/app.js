const testButton = document.querySelector('#myButton');
const addButton = document.querySelector('#myButton1');
const deleteButton = document.querySelector('#myButton2');
const checkbox = document.querySelector('#alert');
let counter = 0;

function incrementCounter() {
    counter++;
    document.querySelector('#wynik').textContent = counter;
}

function alertFunctionality() {
    alert('Hello from second function!');
}

function addIncrementFunctionality() {
    testButton.addEventListener('click', incrementCounter);
}

function deleteIncrementFunctionality() {
    testButton.removeEventListener('click', incrementCounter);
    counter = 0;
    document.querySelector('#wynik').textContent = counter;
}

function addAlertFunctionality() {
    testButton.addEventListener('click', alertFunctionality);
}

function deleteAlertFunctionality() {
    testButton.removeEventListener('click', alertFunctionality);
}

function handleAlertFunctionality() {
    if (checkbox.checked) {
        addButton.addEventListener('click', addAlertFunctionality);
        deleteButton.addEventListener('click', deleteAlertFunctionality);
    } else {
        deleteAlertFunctionality();
        addButton.removeEventListener('click', addAlertFunctionality);
        deleteButton.removeEventListener('click', deleteAlertFunctionality);
    }
}

addButton.addEventListener('click', addIncrementFunctionality);
deleteButton.addEventListener('click', deleteIncrementFunctionality);
checkbox.addEventListener('change', handleAlertFunctionality)