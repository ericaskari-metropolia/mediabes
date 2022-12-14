import { AppBottomHeaderBuilder } from '../shared/components/app-bottom-header.js';
import { AppTopHeaderBuilder } from '../shared/components/app-top-header';
import { AppLoadingIndicatorBuilder } from '../shared/components/app-loading-indicator.js';
import { endpoints } from '../shared/common.js';

window.addEventListener('load', async () => {
    //  Element references
    const elements = {
        form: document.querySelector('form'),
        clickArea: document.querySelector('.upload-click-area'),
        fileInput: document.querySelector('.file-input'),
        formErrorMessage: document.querySelector('.form-error-message'),
        formSuccessMessage: document.querySelector('.form-success-message')
    };

    //  Page Loading Indicator
    const { hideLoading, showLoading } = AppLoadingIndicatorBuilder(document.getElementById('app-loading-indicator'));

    //  Top Header Component
    const { updateTopHeaderAvatar } = AppTopHeaderBuilder(document.getElementById('app-top-header'));

    //  Bottom Header Component
    const { setBottomHeaderUserId } = AppBottomHeaderBuilder(document.getElementById('app-bottom-header'));

    showLoading();

    //  Fetch User profile
    const { body, response, error } = await endpoints.getMyUserProfile();
    const { user, userAvatar } = body;

    setBottomHeaderUserId(user.id);

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

    hideLoading();
});
