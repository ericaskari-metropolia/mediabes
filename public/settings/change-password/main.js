import { enableFormDebug, isDevelopment, endpoints, formDataToJson } from '../../shared/common.js';
import { AppLoadingIndicatorBuilder } from '../../shared/components/app-loading-indicator.js';

window.addEventListener('load', () => {
    const { hideLoading, showLoading } = AppLoadingIndicatorBuilder(document.getElementById('app-loading-indicator'));

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
            showLoading();
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

            const { body, error } = {
                body: {
                    message: 'Password reset successfully.'
                },
                error: null
            };

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
            hideLoading();
        }
    };
});
