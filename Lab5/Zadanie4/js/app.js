const addButton = document.querySelector('#addButton');
const removeButton = document.querySelector('#removeButton');
let itemCount = 0;

function addItem() {
    const list = document.querySelector('#itemList');
    const newItem = document.createElement('li');
    newItem.textContent = 'Item ' + ++itemCount;
    list.appendChild(newItem);
}

function removeItem() {
    const list = document.querySelector('#itemList');
    const firstElement = list.querySelector('li').textContent;
    let toRemove = [];
    for (let item of list.children) {
        if (item.textContent === firstElement) {
            toRemove.push(item);
        }
    }
    for (let item of toRemove) {
        list.removeChild(item);
        itemCount--;
    }
}

addButton.addEventListener('click', addItem);
removeButton.addEventListener('click', removeItem);