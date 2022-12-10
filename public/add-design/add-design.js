import { AppHeaderBuilder } from '../components/app-header.js';

window.addEventListener('load', async () => {
    AppHeaderBuilder(document.getElementById('app-header'));
});

const form = document.querySelector('form'),
    fileInput = form.querySelector('.file-input');

form.addEventListener('click', () => {
    fileInput.click();
});
