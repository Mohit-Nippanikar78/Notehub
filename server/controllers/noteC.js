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
    newNote.shorturl = newNote._id.toString();
    await newNote.save();
    let { id, head, shorturl } = newNote;
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
    res.send({ id, head, fields, shorturl });
  } catch (error) {
    res.send(error);
  }
};
const getNoteHeads = async (req, res) => {
  try {
    let { page } = req.query;
    if (req.query?.type == "viewall") {
      let pages = 30;
      let notes = await Note.find()
        .sort({ updatedAt: -1 })
        .skip(parseInt(page) * pages)
        .limit(pages)
        .exec();
      let heads = await notes.map((note) => {
        let { id, head, shorturl } = note;
        return { id, head, shorturl };
      });
      let nextnotes = await Note.find()
        .sort({ updatedAt: -1 })
        .skip((parseInt(page) + 1) * pages)
        .limit(pages)
        .exec();
      res.send({ data: heads, hasMore: nextnotes.length > 0 });
    } else {
      let pages = 15;
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
    }
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
    let { id, head, shorturl } = note;
    res.send({ id, fields, head, shorturl });
  } catch (error) {
    res.send(error);
  }
};
const getNoteFieldUrl = async (req, res) => {
  try {
    let { shorturl } = req.params;
    let note = await Note.findOne({ shorturl }).exec();
    if (note) {
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
      let { id, head } = note;
      res.send({ id, fields, head, shorturl });
    } else {
      res.send({ error: "nonote" });
    }
  } catch (error) {
    res.send(error);
  }
};
const updateNote = async (req, res) => {
  try {
    let { type } = req.query;
    let { noteId } = req.params;
    let note = await Note.findById(noteId);
    if (type == "head") {
      note.head = req.body.head;
      await note.save();
      let { id, head } = note;
      res.send({ id, head });
    } else if (type == "shorturl") {
      console.log("entry");
      let alreadyNote = await Note.findOne({
        shorturl: req.body.shorturl,
      }).exec();
      let { id, shorturl } = note;
      if (alreadyNote) {
        res.send({ id, shorturl, unique: false });
      } else {
        note.shorturl = req.body.shorturl;
        await note.save();
        res.send({ id, shorturl, unique: true });
      }
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
  getNoteFieldUrl,
  updateNote,
  addNoteField,
  deleteNote,
  updateNoteField,
  deleteNoteField,
};
