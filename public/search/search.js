// import { AppBottomHeaderBuilder } from '../shared/components/app-bottom-header.js';
// import { AppTopHeaderBuilder } from '../shared/components/app-top-header';

('use strict');
const apiUrl = 'https://mediabes.nicerock-48a381ae.northeurope.azurecontainerapps.io/search/user/?username=';

// get references to DOM elements
const form = document.querySelector('#search-form');
const button = form.querySelector('button');
const input = form.querySelector('input');
const results = document.querySelector('#results');

button.addEventListener('click', (event) => {
    // do not submit the form to anywhere (no page refresh)
    event.preventDefault();
    // prevent the generic event listener at the bottom
    event.stopPropagation();
    if (input.value.length > 1) {
        getUserData(input.value);
    }
});

//getting data that is typed
const renderResults = (data) => {
    //clear existing results before appending new ones
    results.innerHTML = '';
    //loop through all search results
    for (let i = 0; i < data.length; i++) {
        const name = document.createElement('h3');
        name.textContent = 'Name: ' + data[i].user.name;

        const username = document.createElement('p');
        username.textContent = 'Username: ' + data[i].user.username;

        results.append(name);
        results.append(username);
    }
};

const getUserData = async (name) => {
    try {
        const response = await fetch(apiUrl + name);
        const data = await response.json();
        console.log('results:', data);
        renderResults(data);
    } catch (error) {
        console.log('network failure:', error);
    }
};

//generic event handling example
document.addEventListener('click', (event) => {
    console.log('mouse clicked somewhere on the page', event);
});

// AppTopHeaderBuilder(document.getElementById('app-top-header'), user.id);
// AppBottomHeaderBuilder(document.getElementById('app-bottom-header'), user.id);

// const userCardTemplate = document.querySelector('[data-user-template]');
// const userCardContainer = document.querySelector('[data-user-cards-container]');
// const searchInput = document.querySelector('[data-search]');

// let users = [];

// searchInput.addEventListener('input', (e) => {
//     const value = e.target.value.toLowerCase();
//     users.forEach((user) => {
//         const isVisible = user.name.toLowerCase().includes(value) || user.email.toLowerCase().includes(value);
//         user.element.classList.toggle('hide', !isVisible);
//     });
// });
// // fetch('https://mediabes.nicerock-48a381ae.northeurope.azurecontainerapps.io')
// fetch('https://jsonplaceholder.typicode.com/users')
//     .then((res) => res.json())
//     .then((data) => {
//         users = data.map((user) => {
//             const card = userCardTemplate.content.cloneNode(true).children[0];
//             const header = card.querySelector('[data-header]');
//             const body = card.querySelector('[data-body]');
//             header.textContent = user.name;
//             body.textContent = user.email;
//             userCardContainer.append(card);
//             return { name: user.name, email: user.email, element: card };
//         });
//     });
