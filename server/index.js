const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
var bodyParser = require("body-parser");
const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
mongoose.connect(process.env.MONGODB_URL).then(() => {
  app.listen(process.env.PORT || 3000, () => {
    console.log("Server running on 3000");
  });
});
app.use("/notes", require("./routes/noteR.js"));
