const fs = require("fs")

const getnotes = function () {
    return 'Your notes'
}
const addNote = function (title, body) {
    const notes = loadNote()

    const duplicateNote = notes.find(function (note) {
        return note.title === title
    })
    if (!duplicateNote) {
        console.log('adding a note...')
        notes.push({
            title: title,
            body: body
        })
        saveNote(notes)

    } else {
        console.log('Note title Taken')
    }
}

const saveNote = function (notes) {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

const loadNote = function () {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    } catch (e) {
        return []
    }

}

const removeNote = function (title) {
    try {
        const notes = loadNote()
        const notesToKeep = notes.filter((note) => {
            return note.title !== title
        })

        saveNote(notesToKeep)
    } catch (e) {
        return 'Note doesnt exists'
    }
}

const listNotes = function () {
    try {
        const notes = loadNote()
        notes.forEach(note => {
            console.log(note.title)
        })
    } catch (e) {
        console.log('List empty')
    }
}

const readNotes = function (title) {
    const notes = loadNote()
    const noteToRead = notes.find((note) => note.title === title)

    if (notes) {
        console.log(noteToRead.title)
        console.log(noteToRead.body)
    } else {
        console.log('note not found')
    }
}
module.exports = {
    addNote: addNote,
    getnotes: getnotes,
    removeNote: removeNote,
    listNotes: listNotes,
    readNotes: readNotes
}