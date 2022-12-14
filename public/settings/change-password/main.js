import { endpoints, formDataToJson } from '../../shared/common.js';
import { AppLoadingIndicatorBuilder } from '../../shared/components/app-loading-indicator.js';
import { AppTopHeaderBuilder } from '../../shared/components/app-top-header.js';
import { AppBottomHeaderBuilder } from '../../shared/components/app-bottom-header.js';

window.addEventListener('load', async () => {
    const elements = {
        form: document.getElementById('page-form'),
        formErrorMessage: document.getElementsByClassName('form-error-message')[0],
        formSuccessMessage: document.getElementsByClassName('form-success-message')[0],
        debug: document.getElementById('debug')
    };

    //  Page Loading Indicator
    const { hideLoading, showLoading } = AppLoadingIndicatorBuilder(document.getElementById('app-loading-indicator'));
    //  Top Header Component
    const { updateTopHeaderAvatar } = AppTopHeaderBuilder(document.getElementById('app-top-header'));
    //  Bottom Header Component
    const { setBottomHeaderUserId } = AppBottomHeaderBuilder(document.getElementById('app-bottom-header'));

    showLoading();

    const { body, response, error } = await endpoints.getMyUserProfile();
    const { user, userAvatar } = body;

    setBottomHeaderUserId(user.id);

    if (userAvatar) {
        updateTopHeaderAvatar(userAvatar.url);
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
            hideLoading();
        }
    };

    hideLoading();
});
