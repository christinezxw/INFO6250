const express = require('express');
const app = express();
const PORT = 5000;
const facts = require('./src/facts');

app.use(express.static('./build'));

app.get('/facts', (req, res) => {
    setTimeout(() => { res.send(facts); }, 3000);
});

app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));
