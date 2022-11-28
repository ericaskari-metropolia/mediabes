export const VITE_APP_ENV = () => import.meta.env.VITE_APP_ENV ?? 'development';
export const isProduction = () => VITE_APP_ENV() === 'production';
export const isDevelopment = () => VITE_APP_ENV() === 'development';

/**
 * All Session Storage related methods
 * Used self invoked function to reuse methods. otherwise it's the same as object.
 */
export const storage = (() => {
    const setUser = (user) => sessionStorage.setItem('user', JSON.stringify(user));
    const getUser = () => JSON.parse(sessionStorage.getItem('user'));

    const setToken = (token) => sessionStorage.setItem('token', token);
    const getToken = () => sessionStorage.getItem('token');

    const setExpiresAt = (expiresAt) => sessionStorage.setItem('expiresAt', String(expiresAt));
    const getExpiresAt = () => {
        const parsed = Number.parseInt(sessionStorage.getItem('expiresAt'));
        return Number.isNaN(parsed) ? Date.now() : parsed;
    };

    const hasValidSession = () => {
        return getExpiresAt() > Date.now() && getUser() && getToken();
    };

    return {
        setUser,
        setToken,
        setExpiresAt,
        getUser,
        getToken,
        getExpiresAt,
        hasValidSession
    };
})();

const url = 'http://localhost:3000';

/**
 * All Application Endpoints
 */
export const endpoints = {
    resetPassword: async ({ oldPassword, newPassword }, token = storage.getToken()) => {
        const response = await fetch(`${url}/auth/reset-password`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
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
    },
    login: async ({ username, password }, token = storage.getToken()) => {
        const response = await fetch(`${url}/auth/login`, {
            'Content-Type': 'application/json',
            method: 'POST',
            body: { username, password }
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
    },
    register: async ({ name, email, username, password }, token = storage.getToken()) => {
        const response = await fetch(`${url}/auth/register`, {
            'Content-Type': 'application/json',
            method: 'POST',
            body: { name, email, username, password }
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
        debugOutputEl.innerText = JSON.stringify(formDataToJson(formData), undefined, 2);
    };
    printFormValue();
    formEl.oninput = (event) => {
        printFormValue();
    };
};
