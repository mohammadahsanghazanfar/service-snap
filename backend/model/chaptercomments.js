const mongoose = require('mongoose');

const replySchema = new mongoose.Schema({
  author: { type: String },
  pfp: { type: String }, 
  text: { type: String },
});

const commentSchema = new mongoose.Schema({
  author: { type: String },
  pfp: { type: String }, 
  text: { type: String },
  book: { type: String },
  chapter: { type: String },
  repcount: { type: Number, default: 0 },
  replies: [replySchema],
}, { timestamps: true });

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
