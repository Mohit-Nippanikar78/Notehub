const { Schema, model } = require("mongoose");

const NoteSchema = Schema(
  {
    head: String,
    fields: [
      {
        boxId: {
          type: String,
          required: true,
        },
        type: {
          type: String,
          required: true,
          enum: ["textbox", "codebox"],
        },
      },
    ],
    shorturl: String,
  },
  { timestamps: true }
);
const Note = model("Note", NoteSchema);
module.exports = Note;
