const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  image: { type: String, required: true },
  rating: { type: Number, required: true },
  followers: { type: Number, required: true }
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;