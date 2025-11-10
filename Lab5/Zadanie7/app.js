const usersFile = 'user.json';

const template = document.querySelector('.user-card-template');
const container = document.querySelector('.user-card-container');

fetch(usersFile)
    .then(response => {
        if (!response.ok) {
            throw new Error('Błąd sieci: ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {    
        console.log(data);
        
        data.forEach(element => {
            const newUserCard = template.content.cloneNode(true);

            newUserCard.querySelector('.user-name').textContent = element.firstName + ' ' + element.lastName;
            newUserCard.querySelector('.user-street').textContent = element.Address.Street;
            newUserCard.querySelector('.user-city').textContent = element.Address.City;
            newUserCard.querySelector('.user-country').textContent = element.Address.Country;
            newUserCard.querySelector('.user-email').textContent = element.email;
            newUserCard.querySelector('.user-phone').textContent = element.phone;

            const checkbox = newUserCard.querySelector('.address-checkbox');
            const addressData = newUserCard.querySelector('.address-data');

            checkbox.addEventListener('change', () => {
                addressData.classList.toggle('d-none');
            });

            container.appendChild(newUserCard);
        });
    })
    .catch(error => {
        console.error('Wystąpił problem z pobraniem pliku JSON:', error);
    });