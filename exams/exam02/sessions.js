const sessionData = {};
const recipeData = {
    "default": {
        recipeId: "default",
        author: "default",
        title: "default",
        ingredients: "default",
        instruction: "default"
    }
};
const uuid = require('uuid').v4;

const isValidSession = function (sid) {
    return sessionData[sid];
};
const validateUsername = function (username) {
    const clean = username.replace(/[^A-Za-z0-9_]+/g, '');
    if (clean !== username) {
        return { error: 'username contained disallowed characters' };
    }
    if (!username) {
        return { error: 'username was empty' };
    }
    if (username.toLowerCase() === "dog") {
        return { error: 'Sorry dog...' };
    }
    return '';
};
const createSession = function (username) {
    const sid = uuid();
    sessionData[sid] = {
        username: username
    };
    return sid;
};

const addRecipe = function ({ sid, title, ingredients, instruction }) {
    const uuidv4 = require('uuid').v4;
    const recipeId = uuidv4();
    const { username } = sessionData[sid];
    const newRecipe = {
        recipeId: recipeId,
        author: username,
        title: title,
        ingredients: ingredients,
        instruction: instruction
    };
    recipeData[recipeId] = newRecipe;
    return recipeId;
};

const sessions = {
    sessionData,
    recipeData,
    isValidSession,
    validateUsername,
    createSession,
    addRecipe,
};

module.exports = sessions; 