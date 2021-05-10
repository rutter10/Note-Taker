// built in to node => gives a few utilities.
const util = require('util')

const fs = require('fs')

const { v4: uuidv4 } = require('uuid')

const readFile = util.promisify(fs.readFile)
const writeFile = util.promisify(fs.writeFile)
   
class Database {
    async getAllNotes() {
        return readFile('db/db.json', {encoding: 'utf8'}).then((notes) => {
            try{
                return JSON.parse(notes)
            }   catch (error) {
                return JSON.parse([])
            }
        })
    }

    async addNotes ({ title, text}) {

        if (!title || !text) {
            throw new Error ("Note 'title' and 'text' cannot be blank")
        }

        const note = {title, text, id: uuidv4() }

        let allNotes = await this.getAllNotes()
        allNotes = [].concat(allNotes, note)
        console.log(allNotes)
        writeFile('db/db.json', JSON.stringify(allNotes))
        return allNotes
    }

    async deleteNote(id) {
        console.log(id)
        let allNotes = await this.getAllNotes()
        allNotes = allNotes.filter((note) => note.id !== id)
        writeFile('db/db.json', JSON.stringify(allNotes))
    }
}

module.exports = new Database();