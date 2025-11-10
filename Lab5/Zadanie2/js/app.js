const message = document.getElementById('message');
const button = document.getElementById('button');

button.addEventListener('click', () => {
    message.classList.toggle('hide');
});