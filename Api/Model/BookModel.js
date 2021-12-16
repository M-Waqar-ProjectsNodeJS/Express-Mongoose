const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/TestDb");

const Schema = mongoose.Schema;

var bookDataSchema = new Schema(
  {
    title: { type: String, required: true },
    content: String,
    author: String,
  },
  { collection: "Books" }
);

module.exports = mongoose.model("BookModel", bookDataSchema);
