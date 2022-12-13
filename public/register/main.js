import { enableFormDebug, isDevelopment, endpoints, formDataToJson, storage } from '../shared/common.js';
import { faker } from 'https://cdn.skypack.dev/@faker-js/faker';
import { AppLoadingIndicatorBuilder } from '../shared/components/app-loading-indicator.js';

window.addEventListener('load', async () => {
    const { hideLoading, showLoading } = AppLoadingIndicatorBuilder(document.getElementById('app-loading-indicator'));

    const elements = {
        form: document.getElementById('page-form'),
        nameFormControl: document.querySelector('input[name="name"]'),
        emailFormControl: document.querySelector('input[name="email"]'),
        usernameFormControl: document.querySelector('input[name="username"]'),
        passwordFormControl: document.querySelector('input[name="password"]'),
        repeatPasswordFormControl: document.querySelector('input[name="repeatPassword"]'),
        formErrorMessage: document.getElementsByClassName('form-error-message')[0],
        formSuccessMessage: document.getElementsByClassName('form-success-message')[0],
        debug: document.getElementById('debug')
    };

    const randomEmail = faker.internet.email();
    const randomUsername = faker.internet.userName();

    elements.nameFormControl.value = faker.name.fullName();
    elements.emailFormControl.value = randomEmail;
    elements.usernameFormControl.value = randomUsername;
    elements.passwordFormControl.value = randomUsername;
    elements.repeatPasswordFormControl.value = randomUsername;

    if (isDevelopment()) {
        enableFormDebug(elements.form, elements.debug);
    }

    elements.nameFormControl.addEventListener('input', () => {
        const name = (elements.nameFormControl.value ?? '').trim().replaceAll(' ', '').toLowerCase();
        const now = Date.now();
        const nowFiveDigit = now / 100000;
        const random = Math.trunc((nowFiveDigit - Math.trunc(nowFiveDigit)) * 10000);
        elements.usernameFormControl.value = `${name}${random}`;
    });

    elements.form.onsubmit = async (event) => {
        try {
            elements.formSuccessMessage.hidden = true;
            elements.formErrorMessage.hidden = true;
            event.preventDefault();
            showLoading();
            const { username, password, name, email } = formDataToJson(new FormData(elements.form));

            const { error, body, response } = await endpoints.register({
                name,
                email,
                username,
                password
            });

            if (error) {
                elements.formSuccessMessage.hidden = true;
                elements.formErrorMessage.hidden = false;
                elements.formErrorMessage.innerText = [error.message];

                const errors = Array.isArray(error.errors) ? error.errors : [];
                const errorTexts = errors.map(
                    ({ location, msg, param, value }) => `${param.charAt(0).toUpperCase() + param.slice(1)} - ${msg}`
                );
                for (let errorText of errorTexts) {
                    const el = document.createElement('div');
                    el.innerText = errorText;
                    elements.formErrorMessage.appendChild(el);
                }
            } else {
                const { accessToken, expiresAt, message, user } = body;
                elements.formErrorMessage.hidden = true;
                elements.formSuccessMessage.hidden = false;
                elements.formSuccessMessage.innerText =
                    message ?? 'You registered successfully. Redirecting to homepage now.';

                storage.setToken(accessToken);
                storage.setExpiresAt(expiresAt);

                setTimeout(() => {
                    location.href = '/';
                }, 1000);
            }
        } catch (e) {
            console.log(e);
        } finally {
            hideLoading();
        }
    };
});
