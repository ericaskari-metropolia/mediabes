import { enableFormDebug, isDevelopment, endpoints, formDataToJson, storage } from '../shared/common.js';
import { LoadingIndicator } from '../shared/loading-indicator/loading-indicator.js';

window.addEventListener('load', () => {
    const loading = LoadingIndicator.init();
    const elements = {
        form: document.getElementById('page-form'),
        formErrorMessage: document.getElementsByClassName('form-error-message')[0],
        formSuccessMessage: document.getElementsByClassName('form-success-message')[0],
        debug: document.getElementById('debug')
    };

    if (isDevelopment()) {
        enableFormDebug(elements.form, elements.debug);
    }

    elements.form.onsubmit = async (event) => {
        try {
            elements.formSuccessMessage.hidden = true;
            elements.formErrorMessage.hidden = true;
            event.preventDefault();
            await loading.show();

            const { username, password } = formDataToJson(new FormData(elements.form));

            // const { error, body, response } = await endpoints.login({
            //     username,
            //     password
            // });

            const { body, error } = {
                body: {
                    accessToken: '123',
                    user: { id: 1, name: 'User' },
                    expiresAt: Date.now() + 300 * 1000,
                    message: 'Logged in successfully! You will be redirected to home page soon.'
                },
                error: null
            };

            if (error) {
                elements.formSuccessMessage.hidden = true;
                elements.formErrorMessage.hidden = false;
                elements.formErrorMessage.innerText = error.message;
            } else {
                const { message, expiresAt, user, accessToken } = body;
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
