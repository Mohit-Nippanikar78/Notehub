const { Schema, model } = require("mongoose");

const TextboxSchema = Schema(
  {
    con: { type: String, default: "Your text here" },
    type: { type: String, default: "textbox" },
  },
  { timestamps: true }
);
const Textbox = model("Textbox", TextboxSchema);
module.exports = Textbox;
