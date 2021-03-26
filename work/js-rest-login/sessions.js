const sessionData = {};
const userData = {};
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
const validateRankingName = function ({ username, rankingName }) {
    const clean = rankingName.replace(/[^A-Za-z0-9_]+/g, '');
    if (clean !== rankingName) {
        return { error: 'item name contained disallowed characters' };
    }
    if (!rankingName) {
        return { error: 'item name was empty' };
    }
    const rankings = Object.values(userData[username].rankings);
    for (let key in rankings) {
        if (convertName(rankings[key].name) === convertName(rankingName)) {
            return { error: 'item name was duplicate' };
        }
    }
    return '';
}

function convertName(name) {
    return name.replace(/\s/g, '').toLowerCase();
}

const createSession = function (username) {
    const sid = uuid();
    sessionData[sid] = {
        username: username
    };
    if (!userData[username]) {
        userData[username] = {
            username: username,
            rankings: {
                "default": {
                    rankingId: "default",
                    name: "default",
                    score: 3
                }
            }
        }
    }

    return sid;
};

const addRanking = function ({ sid, name }) {
    const uuidv4 = require('uuid').v4;
    const rankingId = uuidv4();
    const newRanking = {
        rankingId: rankingId,
        name: name,
        score: 0
    };
    const { username } = sessionData[sid];
    userData[username].rankings[rankingId] = newRanking;
};

const sessions = {
    sessionData,
    userData,
    isValidSession,
    validateUsername,
    createSession,
    addRanking,
    validateRankingName
};

module.exports = sessions;