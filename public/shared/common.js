export const VITE_APP_ENV = () => import.meta.env.VITE_APP_ENV ?? 'development';
export const isProduction = () => VITE_APP_ENV() === 'production';
export const isDevelopment = () => VITE_APP_ENV() === 'development';

/**
 * All Session Storage related methods
 */
export const storage = {
    setUser: (user) => sessionStorage.setItem('user', JSON.stringify(user)),
    setToken: (token) => sessionStorage.setItem('token', token),
    setExpiresAt: (expiresAt = Date.now()) =>
        sessionStorage.setItem('expiresAt', String(expiresAt)),
    getUser: () => JSON.parse(sessionStorage.getItem('user')),
    getToken: () => sessionStorage.getItem('token'),
    getExpiresAt: () => {
        const parsed = Number.parseInt(sessionStorage.getItem('expiresAt'));
        return Number.isNaN(parsed) ? Date.now() : parsed;
    }
};

const url = 'http://localhost:3000';

/**
 * All Application Endpoints
 */
export const endpoints = {
    resetPassword: async (
        { oldPassword, newPassword },
        token = storage.getToken()
    ) => {
        const response = await fetch(`${url}/auth/reset-password`, {
            method: 'POST',
            headers: {
                Authorization: 'Bearer ' + token
            }
        });
        if (response.status === 200) {
            return {
                body: await response.json(),
                error: null,
                response
            };
        } else {
            const error = await response.json();
            return { error, body: null, response };
        }
    }
};

export const getQueryParam = (param) => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    return urlParams.get(param);
};

/**
 * Does not work for files
 */
export const formDataToJson = (formData) => {
    const json = {};
    for (const [key, value] of formData.entries()) {
        json[key] = value;
    }
    return json;
};

export const enableFormDebug = (formEl, debugOutputEl) => {
    debugOutputEl.hidden = false;
    const printFormValue = () => {
        const formData = new FormData(formEl);
        debugOutputEl.innerText = JSON.stringify(
            formDataToJson(formData),
            undefined,
            2
        );
    };
    printFormValue();
    formEl.oninput = (event) => {
        printFormValue();
    };
};
