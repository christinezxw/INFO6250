const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();
const PORT = 5000;
const sessions = require('./src/sessions');

app.use(express.static('./build'));
app.use(cookieParser());

app.get('/moments', (req, res) => {
    setTimeout(() => { res.send(sessions.momentsData); }, 1000);
});

app.get('/moments/:momentId', express.json(), (req, res) => {
    const momentId = req.params.momentId;
    if (!momentId) {
        res.status(400).json({ error: `momentId-missing` });
    } else if (!sessions.momentsData[momentId]) {
        res.status(404).json({ error: `unknown-momentId: ${momentId}` });
    } else {
        setTimeout(() => { res.send(sessions.momentsData[momentId]); }, 1000);
    }
});

app.get('/userMomentIds', express.json(), (req, res) => {
    const sid = req.cookies.sid;
    if (!sid) {
        res.status(401).json({ error: 'login-required' });
        return;
    } else if (!sessions.isValidSession(sid)) {
        res.status(403).json({ error: 'login-invalid' });
        return;
    }
    setTimeout(() => { res.send(sessions.userMomentsData[sessions.sessionData[sid].username]); }, 1000);
});

app.delete('/moments/:momentId', express.json(), (req, res) => {
    const sid = req.cookies.sid;
    if (!sid) {
        res.status(401).json({ error: 'login-required' });
        return;
    } else if (!sessions.isValidSession(sid)) {
        res.status(403).json({ error: 'login-invalid' });
        return;
    }
    const momentId = req.params.momentId;
    if (!momentId) {
        res.status(400).json({ error: `momentId-missing` });
    } else if (!sessions.momentsData[momentId]) {
        res.status(404).json({ error: `unknown-momentId: ${momentId}` });
    } else {
        sessions.deleteMoment({ sid: sid, momentId: momentId });
        res.status(200).json({});
    }
});

app.post('/moments', express.json(), (req, res) => {
    const sid = req.cookies.sid;
    if (!sid) {
        res.status(401).json({ error: 'login-required' });
        return;
    } else if (!sessions.isValidSession(sid)) {
        res.status(403).json({ error: 'login-invalid' });
        return;
    }
    const { title, content, link } = req.body;
    if (!title) {
        res.status(400).json({ error: `title-missing` });
        return;
    } else if (!content) {
        res.status(400).json({ error: `content-missing` });
        return;
    } else if (!link) {
        res.status(400).json({ error: `link-missing` });
        return;
    }
    const momentId = sessions.addMoment({ sid: sid, title: title, content: content, link: link });
    res.status(200).json({ momentId: momentId });
});

app.patch('/moments/:momentId', express.json(), (req, res) => {
    const momentId = req.params.momentId;
    const likes = req.body.likes;
    if (!momentId) {
        res.status(400).json({ error: `momentId-missing` });
    } else if (!likes) {
        res.status(400).json({ error: `likes-missing` });
    } else {
        sessions.momentsData[momentId].likes = likes;
        res.json(sessions.momentsData[momentId]);
    }
});

app.get('/session', (req, res) => {
    const sid = req.cookies.sid;
    if (!sid) {
        res.status(401).json({ error: 'login-required' });
        return;
    }
    if (sessions.isValidSession(sid)) {
        const username = sessions.sessionData[sid].username;
        res.status(200).json({ sid: sid, username: username });
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
    setTimeout(() => { res.send({}); }, 1000);
});

app.delete('/session', (req, res) => {
    res.clearCookie('sid');
    res.status(200).json({});
});

app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));