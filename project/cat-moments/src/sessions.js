const sessionData = {};
const momentsData = {
    "default": {
        momentId: "default",
        author: "default",
        title: "default",
        content: "default",
        link: "default"
    }
};
const userMomentsData = {};

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

const addMoment = function ({ sid, title, content, link }) {
    const uuidv4 = require('uuid').v4;
    const momentId = uuidv4();
    const { username } = sessionData[sid];
    const newMoment = {
        momentId: momentId,
        author: username,
        title: title,
        content: content,
        link: link
    };
    momentsData[momentId] = newMoment;
    userMomentsData[username][momentId] = momentId;
    return momentId;
};

const deleteMoment = function ({ sid, momentId }) {
    const { username } = sessionData[sid];
    delete momentsData[momentId];
    delete userMomentsData[username][momentId];
};

const sessions = {
    sessionData,
    momentsData,
    userMomentsData,
    isValidSession,
    validateUsername,
    createSession,
    addMoment,
    deleteMoment
};

module.exports = sessions;