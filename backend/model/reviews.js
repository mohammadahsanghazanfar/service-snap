const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
  title: { type: String },
  user: { type: String },
  text: { type: String },
  chapter: { type: String },
  rating: {
    overall: { type: String },
    style: { type: String },
    story: { type: String },
    grammar: { type: String },
    character: { type: String }
  },
  datetime: { type: Date },
  profilepic: { type: String },
  bookName: { type: String }
});

module.exports = mongoose.model('reviews', ReviewSchema);
