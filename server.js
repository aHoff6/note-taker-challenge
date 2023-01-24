const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();

const PORT = process.env.PORT || 3001;

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());



app.post('/api/notes', async (req, res) => {
    try {
        let notes = await fs.promises.readFile('./db/db.json', 'utf8');
        notes = JSON.parse(notes);
        let userNote = req.body;
        userNote.id = Math.floor(Math.random() * 5000);
        notes.push(userNote);
        await fs.promises.writeFile('./db/db.json', JSON.stringify(notes));
        res.json(userNote);
    } catch (err) {
        throw err;
    }
});

//TODO need app.delete route for api/notes/id



app.listen(PORT, () => {
    console.log(`listening on PORT: ${PORT}`);
});

app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, './public/index.html'))
);

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

app.get('/api/notes', (req, res) => {
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) throw err;
        var notes = JSON.parse(data);
        res.json(notes);
    });
});

app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/pages/404.html'))
);


  app.get('api/notes/:id', (req, res) =>{
    res.json(notes[req.params.id]);
  });
  


