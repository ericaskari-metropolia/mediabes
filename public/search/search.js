import { AppBottomHeaderBuilder } from '../shared/components/app-bottom-header.js';
import { AppTopHeaderBuilder } from '../shared/components/app-top-header.js';
import { endpoints } from '../shared/common.js';

// get references to DOM elements
const form = document.querySelector('#search-form');
const button = form.querySelector('button');
const input = form.querySelector('input');
const results = document.querySelector('#results');

//  Top Header Component
const { updateTopHeaderAvatar } = AppTopHeaderBuilder(document.getElementById('app-top-header'));
//  Bottom Header Component
const { setBottomHeaderUserId } = AppBottomHeaderBuilder(document.getElementById('app-bottom-header'));

const { body, response, error } = await endpoints.getMyUserProfile();
const { user, userAvatar } = body;

setBottomHeaderUserId(user.id);

if (userAvatar) {
    updateTopHeaderAvatar(userAvatar.url);
}

//getting data that is typed
const renderResults = (data) => {
    //clear existing results before appending new ones
    results.innerHTML = '';
    //loop through all search results
    for (let i = 0; i < data.length; i++) {
        const name = document.createElement('h3');
        name.textContent = 'Name: ' + data[i].name;

        const username = document.createElement('p');
        username.textContent = 'Username: ' + data[i].username;

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

form.addEventListener('submit', async (event) => {
    // do not submit the form to anywhere (no page refresh)
    event.preventDefault();
    console.log(input.value);
    if (input.value) {
        await getUserData(input.value);
    }
});
