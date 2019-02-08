const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express(); // invoked ;)

const favorites = [];

app.use(cors());
app.use(bodyParser.json());

// GET - Get the current favorites
app.get('/api/favorites', (req, res) => {
    res.send(favorites);
});

// POST - Add a favorite
app.post('/api/favorites', (req, res) => {
    const favoriteId = req.body.id;

    if (favorites.includes(favoriteId)) {
        return res.status(400).send({ message: 'ID already added' });
    }

    favorites.push(favoriteId);

    res.status(201).send(favorites);
});

app.patch('/api/favorites/:id', (req, res) => {
    // DO SOMETHING
});

// DELETE - Deleting favorites
app.delete('/api/favorites/:id', (req, res) => {
    const favoriteId = +req.params.id;

    const favoriteIdIndex = favorites.indexOf(favoriteId);

    if (favoriteIdIndex == -1) {
        return res.status(404).send({ message: 'No favorite brewery found with id of ' + favoriteId })
    }
    
    favorites.splice(favoriteIdIndex, 1);

    res.send(favorites);
});


app.listen(3002, () => {
    console.log('App up and running at localhost:3002');
});
