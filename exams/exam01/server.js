const express = require('express');
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser');

const userinfo = require('./userinfo');
const words = require('./words');
const gameWeb = require('./game-web'); 

const app = express();
const PORT = 3000;

app.use(express.static('./public'));
app.use(cookieParser());
app.use(bodyParser.json())

app.get('/', express.urlencoded({ extended: false }), (req, res) => {
	const {sid, username} = req.cookies;
	if (sid && username && userinfo.checkUser({username:username, sid:sid})) {
        const {errormessage} = req.query;
        res.send(gameWeb.gamePage({username:username, guesses:userinfo.userwords[username], errormessage:errormessage}));
	} else {
		res.send(gameWeb.loginForm());
	}
});

app.post('/', express.urlencoded({ extended: false }), (req, res) => {
    const {username} = req.cookies;
    const guess = req.body.guess;
    if (userinfo.userwords[username]['guessedWords'][guess]) {
        res.redirect('/?errormessage=' + 'This word has been guessed! Try another one.');
    } else if (words.includes(guess.toUpperCase())) {
        userinfo.addUserGuessWord({username:username, guess:guess});
        res.redirect('/');
    } else {
        res.redirect('/?errormessage=' + 'Your input is an invalid word! Please select a valid one from the list.');
    }
});

app.post('/login', express.urlencoded({ extended: false }), (req, res) => {
	const username = req.body.username;
	if(username && username != 'dog') {
		const uuidv4 = require('uuid').v4;
		const sid = uuidv4();
		res.cookie('sid', sid);
		res.cookie('username', username);
		userinfo.addUser({username:username, sid:sid});
        userinfo.startOver(username);
		res.redirect('/');
	} else {
		res.send(`
        <p>Sorry! You are not our user. Please go back to <a href="/">home page</a>.</p>
        `);
	}
});

app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));
