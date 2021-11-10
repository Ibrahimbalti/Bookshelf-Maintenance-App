const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth');

const Book = require('../models/Book');

// @route   GET api/book
// @desc    Get all the user's book
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const book = await Book.find({ user: req.user.id }).sort({
      date: -1,
    });
    res.json(book);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/book
// @desc    Add a new book
// @access  Private
router.post(
  '/',
  [auth, [check('title', 'title is required').not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      title,
      publication_house,
      author,
      genre,
      published_date,
      publisher,
    } = req.body;

    try {
      const newBook = new Book({
        title,
        publication_house,
        author,
        genre,
        published_date,
        publisher,
        user: req.user.id,
      });

      const book = await newBook.save();

      res.json(book);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route   PUT api/book/:id
// @desc    Update a book
// @access  Private
router.put('/:id', auth, async (req, res) => {
  const { title, publication_house, author, genre, published_date, publisher } =
    req.body;

  const contactFields = {};

  if (title) contactFields.title = title;
  if (publication_house) contactFields.publication_house = publication_house;
  if (author) contactFields.author = author;
  if (genre) contactFields.genre = genre;
  if (published_date) contactFields.published_date = published_date;
  if (publisher) contactFields.publisher = publisher;

  try {
    let book = await Book.findById(req.params.id);

    // Check if the book exists
    if (!book)
      return res.status(404).json({ msg: 'This book does not exist.' });

    if (book.user.toString() !== req.user.id) {
      return res.status(401).json({
        msg: 'You do not have the correct authorization to update this Book.',
      });
    }

    // Update book if above conditions pass
    book = await Book.findByIdAndUpdate(
      req.params.id,
      { $set: contactFields },
      { new: true }
    );

    // Return the updated book
    res.json(book);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   DELETE api/book/:id
// @desc    Delete a book
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    let book = await Book.findById(req.params.id);

    // Check if the book exists
    if (!book)
      return res.status(404).json({ msg: 'This Book does not exist.' });

    if (book.user.toString() !== req.user.id) {
      return res.status(401).json({
        msg: 'You do not have the correct authorization to delete this Book.',
      });
    }

    // Find and remove the book from MongoDB
    await Book.findByIdAndRemove(req.params.id);

    // Return a confirmation message
    res.json({ msg: 'This Book has been removed.' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
