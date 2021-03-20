const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();
const PORT = 3000;

app.use(express.static('./public'));
app.use(cookieParser());

const sessions = require('./sessions');

app.get('/ranking', express.json(), (req, res) => {
    const sid = req.cookies.sid;
    if (!sid) {
        res.status(401).json({ error: 'login-required' });
        return;
    } else if (!sessions.isValidSession(sid)) {
        res.status(403).json({ error: 'login-invalid' });
    }
    const { username } = sessions.sessionData[sid];
    res.status(200).json(sessions.userData[username]);
});

app.post('/ranking', express.json(), (req, res) => {
    const sid = req.cookies.sid;
    const { name } = req.body;
    const { username } = sessions.sessionData[sid];

    const error = sessions.validateRankingName({ username: username, rankingName: name });
    if (error) {
        res.status(400).json(error);
        return;
    }
    sessions.addRanking({ sid: sid, name: name });
    res.status(200).json(sessions.userData[username]);
});

app.delete('/ranking/:rankingId', express.json(), (req, res) => {
    const rankingId = req.params.rankingId;
    const sid = req.cookies.sid;
    const { username } = sessions.sessionData[sid];
    if (!rankingId) {
        res.status(400).json({ error: `rankingId-missing` });
    } else if (!sessions.userData[username].rankings[rankingId]) {
        res.status(404).json({ error: `unknown-rankingId: ${rankingId}` });
    } else {
        delete sessions.userData[username].rankings[rankingId];
        res.status(200).json(sessions.userData[username]);
    }
});

app.patch('/ranking/:rankingId', express.json(), (req, res) => {
    const { rankingId } = req.params;
    const { score } = req.body;
    const sid = req.cookies.sid;
    const { username } = sessions.sessionData[sid];
    if (!rankingId) {
        res.status(400).json({ error: `rankingId-missing` });
    } else if (!score) {
        res.status(400).json({ error: `score-missing` });
    } else if (!sessions.userData[username].rankings[rankingId]) {
        res.status(404).json({ error: `unknown-rankingId: ${rankingId}` });
    } else {
        sessions.userData[username].rankings[rankingId].score = score;
        res.status(200).json(sessions.userData[username].rankings[rankingId]);
    }
});

app.get('/session', (req, res) => {
    const sid = req.cookies.sid;
    if (!sid) {
        res.status(401).json({ error: 'login-required' });
        return;
    }
    if (sessions.isValidSession(sid)) {
        const { username } = sessions.sessionData[sid];
        res.status(200).json({});
        return;
    }

    res.status(403).json({ error: 'login-invalid' });
});

app.post('/session', express.json(), (req, res) => {
    const { username } = req.body;
    const error = sessions.validateUsername(username);
    if (error) {
        res.status(400).json(error);
        return;
    }
    const sid = sessions.createSession(username);
    res.cookie('sid', sid);
    res.status(200).json({});
});

app.delete('/session', (req, res) => {
    res.clearCookie('sid');
    res.status(200).json({});
});

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));