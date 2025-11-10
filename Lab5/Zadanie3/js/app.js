const button = document.getElementById('button');
const img = document.querySelector('img');

const images = [
    "1.jpg",
    "2.jpg",
    "3.jpg"
];

let currentIndex = 0;

button.addEventListener('click', () => {
    img.src = images[currentIndex];
    img.className = "image" + (currentIndex + 1);
    currentIndex = (currentIndex + 1) % images.length;
});