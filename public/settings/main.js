import { endpoints } from '../shared/common.js';
import { AppBottomHeaderBuilder } from '../shared/components/app-bottom-header.js';
import { AppTopHeaderBuilder } from '../shared/components/app-top-header.js';
import { AppLoadingIndicatorBuilder } from '../shared/components/app-loading-indicator.js';

window.addEventListener('load', async () => {
    const { hideLoading, showLoading } = AppLoadingIndicatorBuilder(document.getElementById('app-loading-indicator'));
    const { body, response, error } = await endpoints.getMyUserProfile();
    const { user, userAvatar } = body;

    const { updateTopHeaderAvatar } = AppTopHeaderBuilder(document.getElementById('app-top-header'), user.id);
    AppBottomHeaderBuilder(document.getElementById('app-bottom-header'), user.id);

    const elements = {
        settingsAvatarImage: document.querySelector('.var-settings-avatar-img'),
        updateAvatar: document.getElementById('update-avatar'),
        updateAvatarFileInput: document.getElementById('edit-avatar-file-input'),
        updateAvatarForm: document.getElementById('update-avatar-form'),
        debug: document.getElementById('debug'),
        cardList: document.getElementById('card-list')
    };

    if (userAvatar) {
        elements.settingsAvatarImage.setAttribute('src', userAvatar.url);
        updateTopHeaderAvatar(userAvatar.url);
    }

    elements.updateAvatar.onclick = () => {
        elements.updateAvatarFileInput.click();
    };

    elements.updateAvatarFileInput.onchange = async () => {
        const { body, response, error } = await endpoints.updateUserAvatar(
            user.id,
            new FormData(elements.updateAvatarForm)
        );
        if (!error) {
            updateTopHeaderAvatar(body.url);
            elements.settingsAvatarImage.setAttribute('src', body.url);
        }
    };
});
