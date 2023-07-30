const route = require("express").Router();
const {
  addNote,
  getNoteHeads,
  getNoteFields,
  updateNote,
  addNoteField,
  deleteNote,
  updateNoteField,
  deleteNoteField,
  getNoteFieldUrl,
} = require("../controllers/noteC.js");

route.post("/add", addNote);
route.get("/heads", getNoteHeads);
route.get("/note/fields/:noteId", getNoteFields);
route.get("/note/fieldsUrl/:shorturl", getNoteFieldUrl);
route.put("/note/:noteId", updateNote);
// Adding new Codebox or Texbox
route.post("/note/:noteId/field", addNoteField);
//Deleting a note
route.delete("/note/:noteId", deleteNote);
// Updating a Codebox or Textbox
route.put("/note/:noteId/field/:boxId", updateNoteField);
// Deleting a Codebox or Textbox
route.delete("/note/:noteId/field/:boxId", deleteNoteField);
module.exports = route;
