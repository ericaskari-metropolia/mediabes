import { enableFormDebug, isDevelopment, endpoints, formDataToJson, storage } from '../shared/common.js';
import { LoadingIndicator } from '../shared/loading-indicator/loading-indicator.js';

window.addEventListener('load', () => {
    const loading = LoadingIndicator.init();
    const elements = {
        form: document.getElementById('page-form'),
        nameFormControl: document.querySelector('input[name="name"]'),
        usernameFormControl: document.querySelector('input[name="username"]'),
        formErrorMessage: document.getElementsByClassName('form-error-message')[0],
        formSuccessMessage: document.getElementsByClassName('form-success-message')[0],
        debug: document.getElementById('debug')
    };
    console.log(elements.username);
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
            await loading.show();

            const { username, password, name, email } = formDataToJson(new FormData(elements.form));

            // const { error, body, response } = await endpoints.register({
            //     name,
            //     email,
            //     username,
            //     password
            // });

            const { body, error } = {
                body: {
                    accessToken: '123',
                    user: { id: 1, name: 'User' },
                    expiresAt: Date.now() + 300 * 1000,
                    message: 'Registered successfully! You will be redirected to home page soon.'
                },
                error: null
            };

            if (error) {
                elements.formSuccessMessage.hidden = true;
                elements.formErrorMessage.hidden = false;
                elements.formErrorMessage.innerText = error.message;
            } else {
                const { accessToken, expiresAt, message, user } = body;
                elements.formErrorMessage.hidden = true;
                elements.formSuccessMessage.hidden = false;
                elements.formSuccessMessage.innerText = message;

                storage.setUser(user);
                storage.setToken(accessToken);
                storage.setExpiresAt(expiresAt);

                setTimeout(() => {
                    location.href = '/';
                }, 1000);
            }
        } catch (e) {
            console.log(e);
        } finally {
            loading.hide();
        }
    };
});
