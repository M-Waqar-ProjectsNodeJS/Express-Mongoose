const express = require("express");
const BookModel = require("../Model/BookModel");

const router = express.Router();

router.get("/api/books", (req, res, next) => {
  BookModel.find()
    .then((docs) => {
      res.status(200).json(docs);
    })
    .catch((error) => {
      next(error);
    });
});
router.get("/api/books/:id", async (req, res, next) => {
  const book = await BookModel.findById(req.params.id);
  res.status(200).json(book);
});
router.post("/api/books", async (req, res, next) => {
  const item = {
    title: req.body.title,
    content: req.body.content,
    author: req.body.author,
  };
  const book = new BookModel(item);
  await book.save();
  res.status(201).json(book);
});
router.put("/api/books", async (req, res, next) => {
  BookModel.findById(req.body.id)
    .then((doc) => {
      console.log(doc);
      if (doc) {
        doc.title = req.body.title;
        doc.content = req.body.content;
        doc.author = req.body.author;
        doc.save();
        res.status(200).json(doc);
      } else {
        next("No Book Found");
      }
    })
    .catch((error) => {
      next(error);
    });
});
router.delete("/api/books", async (req, res, next) => {
  const id = req.body.id;
  BookModel.findByIdAndRemove(id).exec();
  res.status(200).json({
    message: "Deleted",
  });
});

module.exports = router;
