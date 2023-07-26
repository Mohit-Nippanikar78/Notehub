const Codebox = require("../models/codebox");
const Note = require("../models/note");
const Textbox = require("../models/textbox");

const addNote = async (req, res) => {
  try {
    let newCodebox = await Codebox.create({});
    let newTextbox = await Textbox.create({});
    let newNoteInit = {
      head: `New Note ${Math.floor(Math.random() * 100)}`,
      fields: [
        { boxId: newCodebox._id.toString(), type: "codebox" },
        { boxId: newTextbox._id.toString(), type: "textbox" },
      ],
    };
    let newNote = await Note.create(newNoteInit);
    let { id, head } = newNote;
    let fields = newNote.fields.map((item) => {
      if (item.type == "codebox") {
        return {
          id: item.id.toString(),
          title: newCodebox.title,
          con: newCodebox.con,
          type: item.type,
        };
      } else if (item.type == "textbox") {
        return {
          id: item.id.toString(),
          con: newTextbox.con,
          type: item.type,
        };
      }
    });
    res.send({ id, head, fields });
  } catch (error) {
    res.send(error);
  }
};
const getNoteHeads = async (req, res) => {
  try {
    let { page } = req.query;
    let pages = 10;
    let notes = await Note.find()
      .sort({ updatedAt: -1 })
      .skip(parseInt(page) * pages)
      .limit(pages)
      .exec();
    let heads = await notes.map((note) => {
      let { id, head } = note;
      return { id, head };
    });
    let nextnotes = await Note.find()
      .sort({ updatedAt: -1 })
      .skip((parseInt(page) + 1) * pages)
      .limit(pages)
      .exec();
    res.send({ data: heads, hasMore: nextnotes.length > 0 });
  } catch (error) {
    res.send(error);
  }
};
const getNoteFields = async (req, res) => {
  try {
    let { noteId } = req.params;
    let note = await Note.findById(noteId);
    let fields = await Promise.all(
      note.fields.map(async (item) => {
        if (item.type == "codebox") {
          let codebox = await Codebox.findById(item.boxId);
          return {
            id: codebox._id.toString(),
            title: codebox.title,
            con: codebox.con,
            type: item.type,
          };
        } else if (item.type == "textbox") {
          let textbox = await Textbox.findById(item.boxId);
          return {
            id: textbox._id.toString(),
            con: textbox.con,
            type: item.type,
          };
        }
      })
    );
    res.send(fields);
  } catch (error) {
    res.send(error);
  }
};
const updateNote = async (req, res) => {
  try {
    let { type } = req.query;
    if (type == "head") {
      let { noteId } = req.params;
      let note = await Note.findById(noteId);
      note.head = req.body.head;
      await note.save();
      let { id, head } = note;
      res.send({ id, head });
    }
  } catch (error) {
    res.send(error);
  }
};
const addNoteField = async (req, res) => {
  try {
    let { noteId } = req.params;
    let { type } = req.query;
    if (type == "codebox") {
      let newCodebox = await Codebox.create({});
      let { id, con } = newCodebox;
      let note = await Note.findById(noteId);
      note.fields.push({ boxId: id, type });
      await note.save();
      res.send({ id, type, con });
    } else if (type == "textbox") {
      let newTextbox = await Textbox.create({});
      let { id, con } = newTextbox;
      let note = await Note.findById(noteId);
      note.fields.push({ boxId: id, type });
      await note.save();
      res.send({ id, type, con });
    }
  } catch (error) {
    res.send(error);
  }
};
const deleteNote = async (req, res) => {
  try {
    let { noteId } = req.params;
    let removedId = noteId;
    await Note.findByIdAndDelete(noteId);
    res.send({ deletedId: noteId });
  } catch (error) {
    res.send(error);
  }
};

const updateNoteField = async (req, res) => {
  try {
    let { boxId } = req.params;
    let { type, element } = req.query;
    let { text } = req.body;
    if (type == "codebox") {
      let codebox = await Codebox.findById(boxId);
      element == "con" && (codebox.con = text);
      element == "title" && (codebox.title = text);
      await codebox.save();
      res.send({ status: "OK" });
    } else if (type == "textbox") {
      let textbox = await Textbox.findById(boxId);
      textbox.con = text;
      await textbox.save();
      res.send({ status: "OK" });
    }
  } catch (error) {
    res.send(error);
  }
};
const deleteNoteField = async (req, res) => {
  try {
    console.log(req);
    let { noteId, boxId } = req.params;
    let { type } = req.query;
    // let note = Note.findById(noteId);
    // let index = note.fields.findIndex((item) => item.boxId == boxId);
    // note.fields.splice(index, 1);
    // await note.save();
    if (type == "codebox") {
      await Codebox.deleteOne({ id: boxId });
    } else if (type == "textbox") {
      await Textbox.findByIdAndDelete(boxId);
    }
    res.send({ deletedBoxId: boxId });
  } catch (error) {
    res.send(error);
  }
};

module.exports = {
  addNote,
  getNoteHeads,
  getNoteFields,
  updateNote,
  addNoteField,
  deleteNote,
  updateNoteField,
  deleteNoteField,
};
