import { AppBottomHeaderBuilder } from '../../shared/components/app-bottom-header.js';
import { LoadingIndicator } from '../../shared/loading-indicator/loading-indicator.js';
import { enableFormDebug, endpoints, formDataToJson, isDevelopment, storage } from '../../shared/common.js';
import { AppTopHeaderBuilder } from '../../shared/components/app-top-header.js';

window.addEventListener('load', async () => {
    const loading = LoadingIndicator.init(true);

    const { body, response, error } = await endpoints.getMyUserProfile();
    const { user } = body;
    AppTopHeaderBuilder(document.getElementById('app-top-header'), user.id);
    AppBottomHeaderBuilder(document.getElementById('app-bottom-header'), user.id);

    const elements = {
        form: document.getElementById('page-form'),
        cardNumber: document.getElementById('cardNumber'),
        cardHolderName: document.getElementById('card-holder-name'),
        amount: document.getElementById('amount'),
        formErrorMessage: document.querySelector('.form-error-message'),
        formSuccessMessage: document.querySelector('.form-success-message'),
        debug: document.getElementById('debug')
    };

    elements.cardNumber.value = '1234567891231234';
    elements.cardHolderName.value = 'John Doe';
    elements.amount.value = 30;

    if (isDevelopment()) {
        enableFormDebug(elements.form, elements.debug);
    }

    elements.form.onsubmit = async (event) => {
        elements.formSuccessMessage.hidden = true;
        elements.formErrorMessage.hidden = true;
        event.preventDefault();
        await loading.show();
        const { amount, cardNumber, cardHolderName } = formDataToJson(new FormData(elements.form));

        const { error, body, response } = await endpoints.deposit({ amount, cardNumber, cardHolderName });

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
            const { message } = body;
            elements.formErrorMessage.hidden = true;
            elements.formSuccessMessage.hidden = false;
            elements.formSuccessMessage.innerText =
                message ?? 'Money added to the account successfully. Redirecting to profile now.';

            setTimeout(() => {
                location.href = '/profile/';
            }, 2000);
        }
    };
});
