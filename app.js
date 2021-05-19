// Requires Express
const express = require('express');

// Allows a redirect to routes
const router = express.Router();


const app = express();
const path = require('path');

// Allow deployment or use on local host 3000
const port = process.env.PORT || 3000;
const database = require('./db/db');

// Allowing use json content
app.use(express.json());

// Secruity Feature to encode certain characters 
app.use(express.urlencoded({ extended: true }));

// All content in public folder is static content.
app.use(express.static('public'));

// On this '/' use the router and perform get
app.use('/', router);
app.use('/notes', router);
app.use('/api', router);

// Setting up get requests for html routes (This is for main page of local host [Nothing after /])
router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

// Setting up get request for html routes (the html you get for /notes in URL.)
router.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/notes.html'));
});

// Setting up get request for html routes (the html you get for /api/notes in URL.)
router.get('/api/notes', async (req, res) => {
  const notes = await database.getAllNotes();
  return res.json(notes);
});

router.post('/api/notes', async (req, res) => {
  const notes = await database.addNote(req.body);
  return res.json(notes);
});

router.delete('/api/notes/:id', async (req, res) => {
  const notes = await database.deleteNote(req.params.id);
  return res.json(notes);
});

// Listening...
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});