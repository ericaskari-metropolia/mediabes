import { AppBottomHeaderBuilder } from '../shared/components/app-bottom-header.js';
import { AppTopHeaderBuilder } from '../shared/components/app-top-header';
import { LoadingIndicator } from '../shared/loading-indicator/loading-indicator';
import { endpoints } from '../shared/common';

window.addEventListener('load', async () => {
    const loading = LoadingIndicator.init(false);

    const { body, response, error } = await endpoints.getMyUserProfile();
    if (error || !body) {
        console.log(error);
        return;
    }
    const { user } = body;

    AppTopHeaderBuilder(document.getElementById('app-top-header'), user.id);
    AppBottomHeaderBuilder(document.getElementById('app-bottom-header'), user.id);
});
