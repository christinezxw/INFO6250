const sessionData = {};
const momentsData = {
    "default1": {
        momentId: "default1",
        author: "MimiGingerGirl",
        title: "Warm sleeping...",
        content: "Such a good weather! She rolls on her back and whitty furry belly up...",
        link: "https://images.app.goo.gl/K8RdvPhhNFnjVNyA7",
        likes: 10
    },
    "default2": {
        momentId: "default2",
        author: "MimiGingerGirl",
        title: "Birds and rabbits in backyard",
        content: "It's so funny that she'll make those sound mocking birds singing when she sees them! And chases the rabbits in the backyard from the house and hits the wall...><",
        link: "https://images.app.goo.gl/FTGAJiqgB3LX12aa6",
        likes: 7
    },
    "default3": {
        momentId: "default3",
        author: "CLJ",
        title: "Fitness day",
        content: "She's been jumpping up to beat the poster on the wall for an hour!!! Please don't beat me at night... Too much muscle!!",
        link: "https://images.app.goo.gl/KWmP2FNRG14T1q8L6",
        likes: 26
    }
};
const userMomentsData = {
    "CLJ": {
        "default3": "default3"
    },
    "MimiGingerGirl": {
        "default1": "default1",
        "default2": "default2"
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
    if (!userMomentsData[username]) {
        userMomentsData[username] = {
        };
    }
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
        link: link,
        likes: 0
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