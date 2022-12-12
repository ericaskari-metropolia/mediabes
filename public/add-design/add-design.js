import { AppBottomHeaderBuilder } from '../shared/components/app-bottom-header.js';
import { AppTopHeaderBuilder } from '../shared/components/app-top-header';
import { LoadingIndicator } from '../shared/loading-indicator/loading-indicator';
import { endpoints } from '../shared/common';

let uploadButton = document.getElementById('upload-button');

let chosenFile = document.getElementById('chosen-file');
let fileName = document.getElementById('file-name');

uploadButton.onchange = () => {
    let reader = new FileReader();
    reader.readAsDataURL(uploadButton.files[0]);
    //console.log(uploadButton.files[0]);
    reader.onload = () => {
        chosenFile.setAttribute('src', reader.result);
    };
    fileName.textContent = uploadButton.files[0].name;
};

window.addEventListener('load', async () => {
    const loading = LoadingIndicator.init(false);

    const { body, response, error } = await endpoints.getMyUserProfile();
    if (error || !body) {
        console.log(error);
        return;
    }
    const { user } = body;

    AppTopHeaderBuilder(document.getElementById('app-top-header'), user.id);
    AppBottomHeaderBuilder(document.getElementById('app-bottom-header'), user.id);
});

const form = document.querySelector('form'),
    fileInput = form.querySelector('.file-input');

form.addEventListener('click', () => {
    fileInput.click();
});
