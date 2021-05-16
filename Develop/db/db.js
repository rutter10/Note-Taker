// built in to node => gives a few utilities.
const fs = require('fs');
const util = require('util');
const { v4: uuidv4 } = require('uuid');

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

// Creating a class for DB
class Database {

  // Method to getAllNotes
  async getAllNotes() {
    return readFile('db/db.json', { encoding: 'utf8' }).then((notes) => {
      try {
        return JSON.parse(notes);
      } catch (error) {
        return JSON.parse([]);
      }
    });
  }

  // Method to addNote
  async addNote({ title, text }) {

    if (!title || !text) {
      throw new Error("Note 'title' and 'text' cannot be blank");
    }

    const note = { title, text, id: uuidv4() };

    let allNotes = await this.getAllNotes();
    allNotes = [].concat(allNotes, note);
    console.log(allNotes);
    writeFile('db/db.json', JSON.stringify(allNotes));
    return allNotes;
  }

  // Method to deleteNote
  async deleteNote(id) {
    console.log(id);
    let allNotes = await this.getAllNotes();
    allNotes = allNotes.filter((note) => note.id !== id);
    writeFile('db/db.json', JSON.stringify(allNotes));
    return allNotes;
  }
}

module.exports = new Database();