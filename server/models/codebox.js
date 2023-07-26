const { Schema, Types, model } = require("mongoose");

const CodeboxSchema = Schema(
  {
    title: { type: String, default: "Untitled" },
    con: { type: String, default: "Your code here" },
    type: { type: String, default: "codebox" },
  },
  { timestamps: true }
);
const Codebox = model("Codebox", CodeboxSchema);
module.exports = Codebox;
