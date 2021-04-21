export const checkSession = () => {
    return fetch('/session', {
        method: 'GET',
    })
        .catch(() => Promise.reject({ error: 'network-error' }))
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            return response.json().then(json => Promise.reject(json));
        });
};

export const createSession = ({ username }) => {
    return fetch('/session', {
        method: 'POST',
        headers: new Headers({
            'content-type': 'application/json',
        }),
        body: JSON.stringify({ username }),
    })
        .catch(() => Promise.reject({ error: 'network-error' }))
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            return response.json().then(json => Promise.reject(json));
        });
};

export const endSession = () => {
    return fetch('/session', {
        method: 'DELETE',
    })
        .catch(() => Promise.reject({ error: 'network-error' }))
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            return response.json().then(json => Promise.reject(json));
        });
};

export const updateLikes = function ({ momentId, likes }) {
    return fetch(`/moments/${momentId}`, {
        method: 'PATCH',
        headers: new Headers({
            'content-type': 'application/json'
        }),
        body: JSON.stringify({
            likes: likes
        })
    })
        .catch(() => {
            return Promise.reject({ error: 'network-error' });
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            return response.json().then(err => Promise.reject(err));
        });
};

export const postMoment = function ({ title, content, link }) {
    return fetch('/moments', {
        method: 'POST',
        headers: new Headers({
            'content-type': 'application/json',
        }),
        body: JSON.stringify({
            title: title,
            content: content,
            link: link
        }),
    })
        .catch(() => {
            return Promise.reject({ error: 'network-error' });
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            return response.json().then(err => Promise.reject(err));
        });
};

export const getMomentById = function (momentId) {
    return fetch(`/moments/${momentId}`, {
        method: 'GET',
    })
        .catch(() => {
            return Promise.reject({ error: 'network-error' });
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            return response.json().then(err => Promise.reject(err));
        });
};

export const getMomentIdsByUsername = function () {
    return fetch(`/userMomentIds`, {
        method: 'GET',
    })
        .catch(() => {
            return Promise.reject({ error: 'network-error' });
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            return response.json().then(err => Promise.reject(err));
        });
};

export const deleteMomentById = function (momentId) {
    return fetch(`/moments/${momentId}`, {
        method: 'DELETE',
    })
        .catch(() => {
            return Promise.reject({ error: 'network-error' });
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            return response.json().then(err => Promise.reject(err));
        });
};

export const getMoments = function () {
    return fetch(`/moments`, {
        method: 'GET',
    })
        .catch(() => {
            return Promise.reject({ error: 'network-error' });
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            return response.json().then(err => Promise.reject(err));
        });
};