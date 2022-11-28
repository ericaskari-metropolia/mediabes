import { enableFormDebug, isDevelopment, endpoints, formDataToJson, storage } from './shared/common.js';
import { LoadingIndicator } from './shared/loading-indicator/loading-indicator.js';

window.addEventListener('load', async () => {
    const loading = LoadingIndicator.init();
    const elements = {
        loadingIndicator: document.getElementsByClassName('loading-indicator')[0],
        debug: document.getElementById('debug')
    };

    if (!storage.hasValidSession()) {
        location.href = '/login/';
    }
});
