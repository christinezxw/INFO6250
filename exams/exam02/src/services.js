export const checkLoginStatus = function () {
    return fetch('/session', {
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

export const performLogin = function (username) {
    return fetch('/session', {
        method: 'POST',
        headers: new Headers({
            'content-type': 'application/json',
        }),
        body: JSON.stringify({ username: username }),
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

export const performLogout = function () {
    return fetch('/session', {
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

export const postRecipe = function ({ title, ingredients, instruction }) {
    return fetch('/recipe', {
        method: 'POST',
        headers: new Headers({
            'content-type': 'application/json',
        }),
        body: JSON.stringify({
            title: title,
            ingredients: ingredients,
            instruction: instruction
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

export const getRecipeById = function (recipeId) {
    return fetch(`/recipe/${recipeId}`, {
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

export const getRecipes = function () {
    return fetch(`/recipe`, {
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