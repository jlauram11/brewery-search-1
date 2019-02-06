const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express(); // invoked ;)

const favorites = [];

app.use(cors());
app.use(bodyParser.json());


// POST - Add a favorite
app.post('/api/favorites', (req, res) => {
    const favoriteId = req.body.id;

    favorites.push(favoriteId);

    res.status(201).send(favorites);
});

// DELETE - Deleting favorites
// favorites.splice(favorites.indexOf(favoriteId), 1)


app.listen(3002, () => {
    console.log('App up and running at localhost:3002');
});
