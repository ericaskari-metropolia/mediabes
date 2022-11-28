import { enableFormDebug, isDevelopment, endpoints, formDataToJson } from '../shared/common.js';
import { LoadingIndicator } from '../shared/loading-indicator/loading-indicator.js';

window.addEventListener('load', () => {
    const loading = LoadingIndicator.init();
    const elements = {
        form: document.getElementById('page-form'),
        loadingIndicator: document.getElementsByClassName('loading-indicator')[0],
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
            loading.show();
            await loading.wait(1000);

            const { newPassword, oldPassword, repeatNewPassword } = formDataToJson(new FormData(elements.form));

            if (oldPassword !== repeatNewPassword) {
                elements.formSuccessMessage.hidden = true;
                elements.formErrorMessage.hidden = false;
                elements.formErrorMessage.innerText = 'Entered passwords do not match.';
                return;
            }
            // const { error, body, response } = await endpoints.resetPassword({
            //     newPassword,
            //     oldPassword
            // });
            const error = null;
            const body = { message: 'Password reset successfully!' };

            if (error) {
                elements.formSuccessMessage.hidden = true;
                elements.formErrorMessage.hidden = false;
                elements.formErrorMessage.innerText = error.message;
            } else {
                elements.formErrorMessage.hidden = true;
                elements.formSuccessMessage.hidden = false;
                elements.formSuccessMessage.innerText = body.message;
            }
        } catch (e) {
            console.log(e);
        } finally {
            loading.hide();
        }
    };
});
