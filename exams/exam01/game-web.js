const userinfo = require("./userinfo");
const words = require("./words");

const gameWeb = {
  gamePage: function({username, guesses, errormessage}) {
      return `
        <!doctype html>
        <html>
          <head>
            <title>Game</title>
            <link rel="stylesheet" href="/css/game.css" />
          </head>
          <body>
            <div id='game'>
              <div class='welcomeMessage'>
                <p>Hi ${username}! Get prepared to guess?</p>
              </div>
              <div class='gameBody'>
                <div class='guess'>
                <div class='guessList'>
                    <p class='title'>The accepted guesses you've made:</p>
                    ${gameWeb.getAllGuessedWords(guesses)}
                </div>
                <div class='guessForm'>
                  <form action="/" method="POST">
                      <input name="guess" value="" placeholder="Enter word to guess"/>
                      <button type="submit">Submit</button>
                  </form>
                </div>
                </div>
                <div class='validList'>
                    <p class='title'>Valid words to guess:</p>
                    ${gameWeb.getAllValidWords(words)}
                </div>
              </div>
              <div class='result'>
                ${gameWeb.showResult(username, guesses, errormessage)}
              </div>
            </div>
          </body>
        </html>
    `;
    },
  
    loginForm: function() {
      return `
      <!doctype html>
        <html>
          <head>
            <title>Game</title>
            <link rel="stylesheet" href="/css/game.css" />
          </head>
          <body>
            <div id='game'>
              <div class='welcomeMessage'>
                <p>Start your game by entering a username</p>
              </div>
              <div class='loginForm'>
                <form action="/login" method="POST">
                  <input name="username" value="" placeholder="Enter username"/>
                  <button type="submit">Submit</button>
                </form>
              </div>
          </div>
          </body>
        </html>
      `;
    },

    getAllGuessedWords: function(guesses) {
      const guessedWords = guesses['guessedWords'];
      if (guessedWords) {
        return `<ul class="wordList">` +
        Object.keys(guessedWords).map( word => `
          <li>
            <div class="word">
              <p>In your #${guessedWords[word]['turns']} turn, word '${word}' matches ${guessedWords[word]['matches']} letters.</p>
            </div>
          </li>
        `).join('') +
        `</ul>`;
      } else {
        return ``;
      }
      
    },

    showResult: function(username, guesses, errormessage) {
      if (errormessage) {
        return `
          <div class="resultMessage">
              <p>${errormessage}</p>
          </div>
        `;
      } else if (Object.keys(guesses['guessedWords']).length === 0) {
        return `
          <div class="resultMessage">
              <p>Waiting for your guess...</p>
          </div>
          `;
      }else {
        const guessedWords = guesses['guessedWords']
        const word = Object.keys(guessedWords)[Object.keys(guessedWords).length - 1];
        const matches = guessedWords[word]['matches'];
        if (word.toUpperCase() != guesses['targetWord']) {
          return `
          <div class="resultMessage">
              <p>Your guess word '${word}' has ${matches} machtes with target word!</p>
          </div>
        `;
        } else {
          const turns = guessedWords[word]['turns'];
          userinfo.startOver(username);
          return `
            <div class="resultMessage">
                <p>Congrats! You successfully figure out the target word '${word}' in ${turns} turns! 
                You can <a href='/'>start over</a>.</p>
            </div>
          `;
        }
      }
    },

    getAllValidWords: function(words) {
      return `<ul class="wordList">` +
      Object.values(words).map( word => `
        <li>
          <div class="word">
            <p>${word}</p>
          </div>
        </li>
      `).join('') +
      `</ul>`;
    },
  };
  module.exports = gameWeb;
  