const express = require('express');
const app = express();
const PORT = 3000;
const inventoryStorage = require('./inventoryStorage');

app.use(express.static('./public'));

const inventory  = inventoryStorage.inventory;

app.get('/inventory', (req, res) => {
    res.json(inventory);
});

app.get('/inventory/:itemId', (req, res) => {
    const itemId = req.params.itemId;
    if(inventory[itemId]) {
        res.json(inventory[itemId]);
    }  else {
        res.status(404).json({error: `unknown itemId: ${itemId}`});
    }
 });

 app.post('/inventory', express.json(), (req, res) => {
    const {name} = req.body;
    if (!name) {
        res.status(400).json({error: `item name missing`});
    } else if (!inventoryStorage.itemNameValid(name)) {
        res.status(400).json({error: `invalid item name`});
    }else if (inventoryStorage.itemNameExist(name)) {
        res.status(409).json({ error: `duplicate item name` });
    }else {
        const uuidv4 = require('uuid').v4;
		const itemId = uuidv4();
        
        inventory[itemId] = {
            itemId: itemId,
            name: name,
            quantity: 0
        };
        res.json(inventory);
    }
});

app.put('/inventory/:itemId', express.json(), (req, res) => {
    const itemId = req.params.itemId;
    const item = req.body.itemId;
    if (!itemId) {
        res.status(400).json({error: `itemId missing`});
    } else if (!item) {
        res.status(400).json({error: `item content missing`});
    } else {
        inventory[itemId] = item;
        res.json(inventory);
    }
});

app.delete('/inventory/:itemId', (req, res) => {
    const itemId = req.params.itemId;
    if (!itemId) {
        res.status(400).json({error: `itemId missing`});
    } else if(!inventory[itemId]) {
        res.status(404).json({error: `unknown itemId: ${itemId}`});
    } else {
        delete inventory[itemId];
        res.json(inventory);
    }
});

app.listen(PORT, () => console.log(`listening on http://localhost:${PORT}`));