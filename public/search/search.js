import { AppBottomHeaderBuilder } from '../shared/components/app-bottom-header.js';
import { AppTopHeaderBuilder } from '../shared/components/app-top-header.js';
import { endpoints } from '../shared/common.js';

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

const { body, response, error } = await endpoints.searchUserByUsername('ericaska');

AppTopHeaderBuilder(document.getElementById('app-top-header'), user.id);
AppBottomHeaderBuilder(document.getElementById('app-bottom-header'), user.id);

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
        const { body, response, error } = await endpoints.searchUserByUsername(name);
        console.log(body, response, error);
        // body is list of users

        console.log('results:', body);
        renderResults(body);
    } catch (error) {
        console.log('network failure:', error);
    }
};
