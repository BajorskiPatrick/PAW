const nameButton = document.getElementById('nameButton');
const outputSection = document.getElementById('outputSection');

function handleNamePrompt() {
    
    const userName = window.prompt("Proszę, podaj swoje imię:");

    if (userName) {
        outputSection.textContent = `Cześć, ${userName}!`;
    } else {
        outputSection.textContent = "Anulowano lub nie podano imienia.";
    }
}

nameButton.addEventListener('click', handleNamePrompt);