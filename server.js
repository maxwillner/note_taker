const express = require("express");
const { notes } = require("./data/db.json"); 
const fs = require("fs");
const path = require("path");

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/api/notes", (req, res) => {  
    res.json(notes);                  
});


app.post("/api/notes", (req, res) => {
    console.log(req.body);
    // req.body.id = notes.length.toString();

    const note = createNewNote(req.body, notes)
    res.json(note);
});


function createNewNote(body, notesArray) {
    const note = body;
    notesArray.push(note)
    fs.writeFileSync(
        path.join(__dirname, "./data/db.json"),
        JSON.stringify({ notes: notesArray }, null, 2)
    );

    return note;
};

app.listen(3001, () => {
    console.log(`API server now on port 3001!`);
  });


