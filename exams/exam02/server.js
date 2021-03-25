const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();
const PORT = 3000;

app.use(express.static('./public'));
app.use(cookieParser());

const sessions = require('./sessions');

app.get('/recipe', express.json(), (req, res) => {
    res.status(200).json(sessions.recipeData);
});

app.get('/recipe/:recipeId', express.json(), (req, res) => {
    const recipeId = req.params.recipeId;
    if (!recipeId) {
        res.status(400).json({ error: `recipeId-missing` });
    } else if (!sessions.recipeData[recipeId]) {
        res.status(404).json({ error: `unknown-recipeId: ${recipeId}` });
    } else {
        res.status(200).json(sessions.recipeData[recipeId]);
    }
});

app.post('/recipe', express.json(), (req, res) => {
    const sid = req.cookies.sid;
    if (!sid) {
        res.status(401).json({ error: 'login-required' });
        return;
    } else if (!sessions.isValidSession(sid)) {
        res.status(403).json({ error: 'login-invalid' });
    }
    const { title, ingredients, instruction } = req.body;
    if (!title) {
        res.status(400).json({ error: `title-missing` });
    } else if (!ingredients) {
        res.status(400).json({ error: `ingredients-missing` });
    } else if (!instruction) {
        res.status(400).json({ error: `instruction-missing` });
    }
    const recipeId = sessions.addRecipe({ sid: sid, title: title, ingredients: ingredients, instruction: instruction });
    res.redirect('/recipe?recipeId=' + recipeId);
});

app.get('/session', (req, res) => {
    const sid = req.cookies.sid;
    if (!sid) {
        res.status(401).json({ error: 'login-required' });
        return;
    }
    if (sessions.isValidSession(sid)) {
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