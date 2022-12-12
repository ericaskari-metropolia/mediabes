import { AppBottomHeaderBuilder } from '../shared/components/app-bottom-header.js';
import { AppTopHeaderBuilder } from '../shared/components/app-top-header';
import { LoadingIndicator } from '../shared/loading-indicator/loading-indicator';
import { endpoints, storage } from '../shared/common';

window.addEventListener('load', async () => {
    const elements = {
        form: document.querySelector('form'),
        clickArea: document.querySelector('.upload-click-area'),
        fileInput: document.querySelector('.file-input'),
        formErrorMessage: document.querySelector('.form-error-message'),
        formSuccessMessage: document.querySelector('.form-success-message')
    };
    const loading = LoadingIndicator.init(false);

    const { body, response, error } = await endpoints.getMyUserProfile();
    if (error || !body) {
        console.log(error);
        return;
    }
    const { user, userAvatar } = body;

    const { updateTopHeaderAvatar } = AppTopHeaderBuilder(document.getElementById('app-top-header'), user.id);
    AppBottomHeaderBuilder(document.getElementById('app-bottom-header'), user.id);

    if (userAvatar) {
        updateTopHeaderAvatar(userAvatar.url);
    }
    let uploadButton = document.getElementById('upload-button');

    let chosenFile = document.getElementById('chosen-file');
    let fileName = document.getElementById('file-name');

    elements.form.onsubmit = async (event) => {
        event.preventDefault();

        const { body, response, error } = await endpoints.addNewDesign(new FormData(elements.form));
        console.log(body, response, error);
        if (error) {
            elements.formSuccessMessage.hidden = true;
            elements.formErrorMessage.hidden = false;
            elements.formErrorMessage.innerText = error.message;
        } else {
            const { message } = body;
            elements.formErrorMessage.hidden = true;
            elements.formSuccessMessage.hidden = false;
            elements.formSuccessMessage.innerText = message ?? 'Design Saved. Redirecting to homepage now.';

            setTimeout(() => {
                location.href = '/';
            }, 1000);
        }
    };

    uploadButton.onchange = () => {
        let reader = new FileReader();
        reader.readAsDataURL(uploadButton.files[0]);
        //console.log(uploadButton.files[0]);
        reader.onload = () => {
            chosenFile.setAttribute('src', reader.result);
        };
        fileName.textContent = uploadButton.files[0].name;
    };

    elements.clickArea.onclick = () => {
        elements.fileInput.click();
    };
});
