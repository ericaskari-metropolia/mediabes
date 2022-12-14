export const VITE_APP_ENV = () => import.meta.env.VITE_APP_ENV ?? 'development';
export const isProduction = () => VITE_APP_ENV() === 'production';
export const isDevelopment = () => VITE_APP_ENV() === 'development';

/**
 * All Session Storage related methods
 * Used self invoked function to reuse methods. otherwise it's the same as object.
 */
export const storage = (() => {
    const setToken = (token) => sessionStorage.setItem('token', token);
    const getToken = () => sessionStorage.getItem('token');

    const setExpiresAt = (expiresAt) => sessionStorage.setItem('expiresAt', String(expiresAt));
    const getExpiresAt = () => {
        const parsed = Number.parseInt(sessionStorage.getItem('expiresAt'));
        return Number.isNaN(parsed) ? Date.now() : parsed;
    };

    const hasValidSession = () => {
        return getExpiresAt() > Date.now() && getToken();
    };

    return {
        setToken,
        setExpiresAt,
        getToken,
        getExpiresAt,
        hasValidSession
    };
})();

const url = isProduction() ? '' : 'http://localhost:3000';

/**
 * All Application Endpoints
 */
export const endpoints = {
    resetPassword: async ({ oldPassword, newPassword }, token = storage.getToken()) => {
        const headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', `Bearer ${token}`);

        const response = await fetch(`${url}/api/auth/reset-password`, {
            method: 'POST',
            headers
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
        const headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Content-Type', 'application/json');

        const response = await fetch(`${url}/api/auth/login`, {
            method: 'POST',
            headers,
            body: JSON.stringify({ username, password })
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
    register: async ({ name, email, username, password }) => {
        const headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Content-Type', 'application/json');

        const response = await fetch(`${url}/api/auth/register`, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({ name, email, username, password })
        });

        if (response.status === 200 || response.status === 201) {
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
    getUsers: async (token = storage.getToken()) => {
        const headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', `Bearer ${token}`);

        const response = await fetch(`${url}/api/user`, {
            method: 'GET',
            headers
        });

        if (response.status === 401) {
            const data = {
                body: null,
                error: null,
                response
            };

            location.href = `/login/?message=${encodeURIComponent('Your session has expired. Please login again.')}`;
            return data;
        }

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
    searchUserByUsername: async (username, token = storage.getToken()) => {
        const headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', `Bearer ${token}`);

        const response = await fetch(`${url}/api/user/?username=${username}`, {
            method: 'GET',
            headers
        });

        if (response.status === 401) {
            const data = {
                body: null,
                error: null,
                response
            };

            location.href = `/login/?message=${encodeURIComponent('Your session has expired. Please login again.')}`;
            return data;
        }

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
    likeDesign: async (designId, token = storage.getToken()) => {
        const headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', `Bearer ${token}`);

        const response = await fetch(`${url}/api/design/${designId}/like`, {
            method: 'POST',
            headers
        });

        if (response.status === 401) {
            const data = {
                body: null,
                error: null,
                response
            };

            location.href = `/login/?message=${encodeURIComponent('Your session has expired. Please login again.')}`;
            return data;
        }

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
    buyDesign: async (designId, token = storage.getToken()) => {
        const headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', `Bearer ${token}`);

        const response = await fetch(`${url}/api/design/${designId}/buy`, {
            method: 'POST',
            headers
        });

        if (response.status === 401) {
            const data = {
                body: null,
                error: null,
                response
            };

            location.href = `/login/?message=${encodeURIComponent('Your session has expired. Please login again.')}`;
            return data;
        }

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
    commentDesign: async (designId, description, token = storage.getToken()) => {
        if (!description.trim()) return;

        const headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', `Bearer ${token}`);

        const response = await fetch(`${url}/api/design/${designId}/comments`, {
            method: 'POST',
            headers,
            body: JSON.stringify({ description })
        });

        if (response.status === 401) {
            const data = {
                body: null,
                error: null,
                response
            };

            location.href = `/login/?message=${encodeURIComponent('Your session has expired. Please login again.')}`;
            return data;
        }

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
    getDesignComments: async (designId, token = storage.getToken()) => {
        const headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', `Bearer ${token}`);

        const response = await fetch(`${url}/api/design/${designId}/comments`, {
            method: 'GET',
            headers
        });

        if (response.status === 401) {
            const data = {
                body: null,
                error: null,
                response
            };

            location.href = `/login/?message=${encodeURIComponent('Your session has expired. Please login again.')}`;
            return data;
        }

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
    getUserProfile: async (userId, token = storage.getToken()) => {
        const headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', `Bearer ${token}`);

        const response = await fetch(`${url}/api/user/${userId}`, {
            method: 'GET',
            headers
        });

        if (response.status === 401) {
            const data = {
                body: null,
                error: null,
                response
            };

            location.href = `/login/?message=${encodeURIComponent('Your session has expired. Please login again.')}`;
            return data;
        }

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
    getAllDesigns: async (token = storage.getToken()) => {
        const headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', `Bearer ${token}`);

        const response = await fetch(`${url}/api/design`, {
            method: 'GET',
            headers
        });

        if (response.status === 401) {
            const data = {
                body: null,
                error: null,
                response
            };

            location.href = `/login/?message=${encodeURIComponent('Your session has expired. Please login again.')}`;
            return data;
        }

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

    getDesignDetails: async (designId, token = storage.getToken()) => {
        const headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', `Bearer ${token}`);

        const response = await fetch(`${url}/api/design/${designId}`, {
            method: 'GET',
            headers
        });

        if (response.status === 401) {
            const data = {
                body: null,
                error: null,
                response
            };

            location.href = `/login/?message=${encodeURIComponent('Your session has expired. Please login again.')}`;
            return data;
        }

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
    getDesignLikeCount: async (designId, token = storage.getToken()) => {
        const headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', `Bearer ${token}`);

        const response = await fetch(`${url}/api/design/${designId}/like`, {
            method: 'GET',
            headers
        });

        if (response.status === 401) {
            const data = {
                body: null,
                error: null,
                response
            };

            location.href = `/login/?message=${encodeURIComponent('Your session has expired. Please login again.')}`;
            return data;
        }

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
    getMyUserProfile: async (token = storage.getToken()) => {
        const headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', `Bearer ${token}`);

        const response = await fetch(`${url}/api/user/token`, {
            method: 'GET',
            headers
        });

        if (response.status === 401) {
            const data = {
                body: null,
                error: null,
                response
            };

            location.href = `/login/?message=${encodeURIComponent('Your session has expired. Please login again.')}`;
            return data;
        }

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
    getUserDesigns: async (userId, token = storage.getToken()) => {
        const headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', `Bearer ${token}`);

        const response = await fetch(`${url}/api/user/${userId}/designs`, {
            method: 'GET',
            headers
        });

        if (response.status === 401) {
            const data = {
                body: null,
                error: null,
                response
            };

            location.href = `/login/?message=${encodeURIComponent('Your session has expired. Please login again.')}`;
            return data;
        }

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
    updateUserAvatar: async (userId, formData, token = storage.getToken()) => {
        const headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Authorization', `Bearer ${token}`);

        const response = await fetch(`${url}/api/user/${userId}/avatar`, {
            method: 'POST',
            headers,
            body: formData
        });

        if (response.status === 401) {
            const data = {
                body: null,
                error: null,
                response
            };

            location.href = `/login/?message=${encodeURIComponent('Your session has expired. Please login again.')}`;
            return data;
        }

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
    addNewDesign: async (formData, token = storage.getToken()) => {
        const headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Authorization', `Bearer ${token}`);

        const response = await fetch(`${url}/api/design/`, {
            method: 'POST',
            headers,
            body: formData
        });

        if (response.status === 401) {
            const data = {
                body: null,
                error: null,
                response
            };

            location.href = `/login/?message=${encodeURIComponent('Your session has expired. Please login again.')}`;
            return data;
        }

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
    deposit: async ({ amount, cardNumber, cardHolderName }, token = storage.getToken()) => {
        const headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', `Bearer ${token}`);

        const response = await fetch(`${url}/api/deposit`, {
            method: 'POST',
            headers,
            body: JSON.stringify({ amount, cardNumber, cardHolderName })
        });

        if (response.status === 401) {
            const data = {
                body: null,
                error: null,
                response
            };

            location.href = `/login/?message=${encodeURIComponent('Your session has expired. Please login again.')}`;
            return data;
        }

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
